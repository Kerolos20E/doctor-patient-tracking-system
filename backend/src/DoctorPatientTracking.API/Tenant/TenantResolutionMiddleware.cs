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
            var baseDomain = config["Tenancy:BaseDomain"]!;
            var host = http.Request.Host.Host;

            if (host.EndsWith("." + baseDomain, StringComparison.OrdinalIgnoreCase))
            {
                var subdomain = host[..^(baseDomain.Length + 1)].ToLowerInvariant();

                var tenantId = await cache.GetOrCreateAsync<Guid?>($"tenant:{subdomain}", async entry =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);

                    return await db.TenantClinics.AsNoTracking()
                        .Where(t => t.Subdomain == subdomain && t.Status == TenantStatus.Active)
                        .Select(t => (Guid?)t.Id)
                        .FirstOrDefaultAsync();
                });

                if (tenantId is null)
                {
                    http.Response.StatusCode = StatusCodes.Status404NotFound;
                    return;
                }

                tenant.SetTenant(tenantId.Value);
            }

            await next(http);
        }
    }
}