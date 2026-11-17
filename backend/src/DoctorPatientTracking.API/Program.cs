using DoctorPatientTracking.API.Tenant;
using DoctorPatientTracking.Domain.Abstractions;
using DoctorPatientTracking.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace DoctorPatientTracking.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        #region Services

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();
        builder.Services.AddMemoryCache();
        builder.Services.AddScoped<ITenantProvider, TenantProvider>();
        builder.Services.AddDbContext<ApplicationDbContext>(e =>
            e.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        #endregion Services

        var app = builder.Build();

        #region Pipelines

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseMiddleware<TenantResolutionMiddleware>();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        #endregion Pipelines

        app.Run();
    }
}