using DoctorPatientTracking.Domain.Abstractions;
using DoctorPatientTracking.Persistence.Data;
using DoctorPatientTracking.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace DoctorPatientTracking.API.Tenant
{
    public sealed class TenantResolutionMiddleware(
        RequestDelegate next, IMemoryCache cache, IConfiguration config)
    {
        public async Task InvokeAsync(HttpContext http, ITenantProvider tenant, ApplicationDbContext db)
        {
            // 1. Check X-Tenant-Id header
            if (http.Request.Headers.TryGetValue("X-Tenant-Id", out var tenantIdHeader) &&
                Guid.TryParse(tenantIdHeader, out var directTenantId))
            {
                tenant.SetTenant(directTenantId);
            }
            // 2. Check X-Subdomain header
            else if (http.Request.Headers.TryGetValue("X-Subdomain", out var subdomainHeader) &&
                     !string.IsNullOrWhiteSpace(subdomainHeader))
            {
                var sub = subdomainHeader.ToString().ToLowerInvariant();
                var tenantId = await GetTenantIdBySubdomain(sub, cache, db);
                if (tenantId.HasValue)
                {
                    tenant.SetTenant(tenantId.Value);
                }
            }
            // 3. Check Host subdomain
            else
            {
                var baseDomain = config["Tenancy:BaseDomain"] ?? "localhost";
                var host = http.Request.Host.Host;

                if (host.EndsWith("." + baseDomain, StringComparison.OrdinalIgnoreCase))
                {
                    var subdomain = host[..^(baseDomain.Length + 1)].ToLowerInvariant();
                    var tenantId = await GetTenantIdBySubdomain(subdomain, cache, db);

                    if (tenantId is null)
                    {
                        http.Response.StatusCode = StatusCodes.Status404NotFound;
                        return;
                    }

                    tenant.SetTenant(tenantId.Value);
                }
            }

            await next(http);
        }

        private static async Task<Guid?> GetTenantIdBySubdomain(string subdomain, IMemoryCache cache, ApplicationDbContext db)
        {
            return await cache.GetOrCreateAsync<Guid?>($"tenant:{subdomain}", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);

                return await db.TenantClinics.AsNoTracking()
                    .Where(t => t.Subdomain == subdomain && t.Status == TenantStatus.Active)
                    .Select(t => (Guid?)t.Id)
                    .FirstOrDefaultAsync();
            });
        }
    }
}