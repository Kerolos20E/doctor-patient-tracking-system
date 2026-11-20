# Doctor & Patient Tracking System

A multi-tenant backend for managing private clinics — built with **ASP.NET Core 10**, **Entity Framework Core**, and **SQL Server**. Each clinic runs on its own subdomain, with isolated data, staff (doctors and secretaries), working hours, holidays, and services.

The repository currently contains the backend API; the `frontend/` folder is reserved for the client application.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Multi-Tenancy](#multi-tenancy)
- [Authentication & Authorization](#authentication--authorization)
- [API Reference](#api-reference)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Domain Model](#domain-model)
- [Project Structure](#project-structure)
- [Development Notes](#development-notes)
- [Roadmap](#roadmap)

---

## Overview

The system lets a doctor run a clinic as a tenant: register the clinic, publish its public profile, define working hours and holidays, manage services and prices, and delegate day-to-day work to secretaries. Patients register under a specific clinic and authenticate against that tenant only.

Tenant resolution happens per request from the subdomain (`clinic-name.localhost` in development), so every query is automatically scoped to a single clinic.

---

## Features

| Area | Capabilities |
| --- | --- |
| **Clinic profile** | Public clinic details for patients, full details for the doctor, update clinic information |
| **Tenancy** | Subdomain resolution, per-tenant data isolation, active/suspended/cancelled clinic states |
| **Identity** | Registration and login with ASP.NET Core Identity, JWT access tokens, rotating refresh tokens |
| **Roles** | `Doctor`, `Secretary`, `Patient` |
| **Staff management** | Search a registered account by phone, promote it to secretary, revoke the secretary role |
| **Working hours** | CRUD for weekly working hours with overlap validation |
| **Holidays** | CRUD for clinic closed dates, lookup by date |
| **Services** | CRUD for clinic services (examination, re-examination, consultation) with pricing and duration |

---

## Architecture

The solution follows a layered, clean-architecture-inspired structure with a specification pattern for queries:

```
API  ──►  Presentation (Controllers)
             │
             ├──►  Services (business logic, factories, specifications)
             │        │
             │        └──►  ServicesAbstraction (contracts)
             │
             └──►  Persistence (EF Core, repositories, configurations, migrations)
                      │
                      └──►  Domain (entities, enums, exceptions, abstractions)
                               ▲
                          Shared (DTOs, enums, JWT options)
```

- **Controllers** stay thin: they call a service and wrap the result in `ApiResponse<T>`.
- **Services** hold business rules and throw domain exceptions (`NotFoundException`, `BadRequestException`, …).
- **Repositories** are generic where possible, with entity-specific implementations on top.
- **Specifications** build reusable, tenant-aware queries instead of scattering LINQ across services.
- **`TenantId`** is applied automatically through global query filters on every `IHaveTenant` entity.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | .NET 10 (`net10.0`) |
| Web | ASP.NET Core Web API, controllers |
| ORM | Entity Framework Core 10 (SQL Server provider) |
| Database | Microsoft SQL Server |
| Identity | ASP.NET Core Identity (`IdentityUser<Guid>`) |
| Auth | JWT Bearer (`Microsoft.AspNetCore.Authentication.JwtBearer`) |
| API docs | OpenAPI + Scalar UI |
| Caching | `IMemoryCache` (tenant lookup) |

---

## Getting Started

### Prerequisites

- [.NET SDK 10.0+](https://dotnet.microsoft.com/download)
- SQL Server (LocalDB, Developer, or Express)
- `dotnet-ef` CLI tool (for managing migrations)

```bash
dotnet tool install --global dotnet-ef
```

### 1. Clone and restore

```bash
git clone <repository-url>
cd doctor-patient-tracking-system/backend
dotnet restore DoctorPatientTracking.slnx
```

### 2. Configure the database

Set the connection string in `src/DoctorPatientTracking.API/appsettings.json` (or via user secrets / environment variables):

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=Clinic.DB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### 3. Set the JWT signing key

`JWT:SecretKey` is **not** committed to the repository. Provide it locally with user secrets:

```bash
cd src/DoctorPatientTracking.API
dotnet user-secrets set "JWT:SecretKey" "<a-long-random-secret-at-least-32-bytes>"
```

In production, supply it as the environment variable `JWT__SecretKey` (or through your secret manager).

### 4. Run the API

```bash
cd backend
dotnet run --project src/DoctorPatientTracking.API
```

The API starts on **http://localhost:5070** (HTTPS profile: `https://localhost:7120`).

Migrations are applied automatically on startup, then roles are seeded. In the **Development** environment a demo clinic is also created.

### 5. Open the API reference

| Environment | URL |
| --- | --- |
| OpenAPI document | `http://localhost:5070/openapi/v1.json` |
| Scalar UI | `http://localhost:5070/scalar/v1` |

> In development, requests must include the tenant subdomain. Open the docs or call the API with the demo host, e.g. `http://test.localhost:5070/scalar/v1`.

---

## Configuration

| Key | Description |
| --- | --- |
| `ConnectionStrings:DefaultConnection` | SQL Server connection string |
| `JWT:Issuer` | Token issuer, validated on every request |
| `JWT:Audience` | Token audience, validated on every request |
| `JWT:SecretKey` | HMAC-SHA256 signing key — **required**, keep out of source control |
| `JWT:ExpirationInMinutes` | Access token lifetime (default `15`) |
| `Tenancy:BaseDomain` | Root domain used for subdomain resolution (default `localhost`) |
| `AllowedHosts` | Permitted host names |

The same values can be supplied as environment variables using the standard .NET convention (`JWT__SecretKey`, `Tenancy__BaseDomain`, …).

---

## Multi-Tenancy

Tenancy is resolved by a middleware that runs before authentication:

1. Read the request host and check whether it ends with `.<Tenancy:BaseDomain>`.
2. Extract the subdomain, e.g. `smile.localhost` → `smile`.
3. Look up an **active** clinic with that subdomain (cached in memory for 5 minutes).
4. Store the clinic id in the scoped `ITenantProvider`.

Requests without a subdomain simply carry no tenant (useful for public endpoints); an unknown or inactive subdomain returns **404**.

Data isolation is enforced at two levels:

- EF Core **global query filters** on every `IHaveTenant` entity, driven by the current tenant id.
- A JWT validation event that rejects a token whose `tenant_id` claim does not match the tenant resolved from the request host — a token issued for one clinic cannot be replayed against another.

> When the tenant cache changes (a clinic is suspended or renamed), the entry expires within 5 minutes.

---

## Authentication & Authorization

**Flow**

1. `POST /api/auth/Register` — registers a **patient** under the current tenant. The username is derived from the tenant and phone number (`{tenantId:N}_{phone}`), so the same phone can exist in different clinics.
2. `POST /api/auth/Login` — validates credentials and returns an access token plus a refresh token. Login requires a resolved tenant.
3. `POST /api/auth/RefreshToken` — exchanges a valid, unexpired refresh token for a new access token.

Access tokens carry `NameIdentifier`, `Name`, `Email`, `Jti`, `tenant_id`, and one role claim per assigned role. They expire after `JWT:ExpirationInMinutes` with zero clock skew.

**Roles**

| Role | Scope |
| --- | --- |
| `Patient` | Public clinic details, own registration and profile |
| `Secretary` | Clinic holidays and scheduled operations |
| `Doctor` | Full clinic administration: profile, staff, working hours, holidays, services |

Secretaries are created by a doctor from an existing account (`AddSecretary`) and removed the same way — there is no separate secretary registration.

---

## API Reference

Base route: `/api/{controller}`. All endpoints return an `ApiResponse<T>` envelope.

### Auth — `/api/auth`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/Register` | Tenant required | Register a patient in the current clinic |
| `POST` | `/Login` | Tenant required | Sign in and receive tokens |
| `POST` | `/RefreshToken?refreshToken={token}` | — | Exchange a refresh token for a new access token |

### Clinic — `/api/clinic`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/Get` | Public | Public clinic profile (no internal fields) |
| `GET` | `/GetForDoctor` | `Doctor` | Full clinic details including subscription status |
| `PUT` | `/Update` | `Doctor` | Update clinic details |

### Services — `/api/clinicservice`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/` | `Doctor` | Create a service |
| `PUT` | `/Update/{id}` | `Doctor` | Update a service |
| `DELETE` | `/Delete/{id}` | `Doctor` | Delete a service |
| `GET` | `/Get/{id}` | `Doctor` | Get a service by id |
| `GET` | `/GetAll?pageIndex=&pageSize=` | `Doctor` | Paged list of services |

### Secretaries — `/api/clinicservice`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/SearchSecretary?phone={phone}` | `Doctor` | Find an account by phone in this clinic |
| `POST` | `/AddSecretary` | `Doctor` | Grant the secretary role |
| `DELETE` | `/RemoveSecretary?phone={phone}` | `Doctor` | Revoke the secretary role |

### Working hours — `/api/timework`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/` | `Doctor` | Add a working-hours slot |
| `POST` | `/Update/{id}` | `Doctor` | Update a slot |
| `DELETE` | `/Delete/{id}` | `Doctor` | Delete a slot |
| `GET` | `/Get/{id}` | `Doctor` | Get a slot by id |
| `GET` | `/GetAll` | `Doctor` | List all working hours |

### Holidays — `/api/holidays`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/` | `Doctor`, `Secretary` | Add a closed date (`multipart/form-data`) |
| `DELETE` | `/Delete/{id}` | `Doctor`, `Secretary` | Delete a closed date |
| `GET` | `/Get/{id}` | `Doctor`, `Secretary` | Get a closed date by id |
| `GET` | `/GetWithDate/{date}` | Public | Look up a closed date |
| `GET` | `/GetAll` | Public | List all closed dates |

**Example**

```bash
curl -X POST "http://test.localhost:5070/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"clinic@test.com","password":"P@ssw0rd"}'
```

---

## Response Format

Every endpoint returns a consistent envelope, whatever the HTTP status:

```json
{
  "isSuccess": true,
  "message": "Retrived all Data.",
  "data": { },
  "errors": null
}
```

Paged results nest their metadata inside `data`:

```json
{
  "isSuccess": true,
  "message": "Retrived all Data.",
  "data": {
    "pageIndex": 1,
    "pageSize": 10,
    "totalCount": 42,
    "dates": []
  },
  "errors": null
}
```

---

## Error Handling

A global exception middleware maps domain exceptions and database failures to consistent HTTP responses, so controllers never need try/catch blocks:

| Condition | Status | Message |
| --- | --- | --- |
| `NotFoundException` | `404` | Resource-specific |
| `ConflictException` | `409` | Resource-specific |
| `ForbiddenException` | `403` | Resource-specific |
| `UnauthenticationException` | `401` | Resource-specific |
| `BadRequestException` | `400` | Validation / business rule |
| FK constraint violation (SQL 547) | `409` | The item is linked to other data and cannot be deleted. |
| Duplicate key (SQL 2601/2627) | `409` | The item already exists. |
| Concurrency conflict | `409` | The item was modified by another request, please try again. |
| Anything else | `500` | An unexpected error occurred. (details logged server-side) |

---

## Domain Model

| Entity | Purpose |
| --- | --- |
| `TenantClinic` | A clinic tenant: profile, subdomain, subscription expiry, status |
| `ApplicationUser` | Identity user scoped to a tenant; doctor, secretary, or patient |
| `RefreshToken` | Rotating refresh token issued at login |
| `ClinicService` | A billable service with type, price, duration, active flag |
| `DaysTimeWork` | A weekly working-hours slot (day, start, end) |
| `ClinicClosedDate` | A holiday / closed date |
| `ClinicQueue` | A patient's place in the clinic queue for a day |
| `Booking` | A booking tied to a queue entry, with payment status |
| `DoctorReview` / `DoctorReviewMedicine` | Visit reviews and prescribed medicines |
| `Medicine`, `MedicalTest` | Reference data for prescriptions and tests |

All business entities implement `IHaveTenant` and are filtered by the current clinic automatically.

---

## Project Structure

```
doctor-patient-tracking-system/
├── backend/
│   ├── DoctorPatientTracking.slnx
│   ├── src/
│   │   ├── DoctorPatientTracking.API/            # Composition root: Program.cs, tenant middleware
│   │   └── DoctorPatientTracking.Domain/         # Entities, enums, exceptions, abstractions
│   ├── DoctorPatientTracking.Presentation/       # Controllers
│   ├── DoctorPatientTracking.Services/           # Business logic, factories, specifications
│   ├── DoctorPatientTracking.ServicesAbstraction/# Service contracts
│   ├── DoctorPatientTracking.Persistence/        # DbContext, configurations, repositories, migrations
│   └── DoctorPatientTracking.Shared/             # DTOs, shared enums, JWT options
└── frontend/                                     # Client application (not started)
```

Layering rules:

- `Domain` depends on nothing.
- `Persistence` and `Services` depend on `Domain` (and `Shared`).
- `Presentation` depends on the service abstractions only.
- `API` wires everything together.

---

## Development Notes

**Demo tenant (Development only)**

| Field | Value |
| --- | --- |
| Subdomain / Host | `test` → `http://test.localhost:5070` |
| Doctor email | `clinic@test.com` |
| Password | `P@ssw0rd` |

The seeder creates the three roles on first run and creates the demo clinic plus its doctor account when the environment is `Development`.

**Migrations**

```bash
cd backend
dotnet ef migrations add <MigrationName> \
  --project DoctorPatientTracking.Persistence \
  --startup-project src/DoctorPatientTracking.API

dotnet ef database update \
  --project DoctorPatientTracking.Persistence \
  --startup-project src/DoctorPatientTracking.API
```

Migrations are applied automatically at startup, so `dotnet ef` commands can fail while the API is running (file lock on the build output) — stop the API first.

**Build**

```bash
cd backend
dotnet build DoctorPatientTracking.slnx
```

---

## Roadmap

- [ ] Patient-facing frontend (framework not yet chosen)
- [ ] Booking and queue endpoints
- [ ] Prescriptions, medical tests, and doctor reviews
- [ ] Automated test suite
- [ ] Rate limiting and account lockout for authentication endpoints
- [ ] Subscription enforcement on clinic operations

---

## License

No license has been added to this repository yet.
