using DoctorPatientTracking.API.Tenant;
using DoctorPatientTracking.Domain.Abstractions;
using DoctorPatientTracking.Domain.Models;
using DoctorPatientTracking.Persistence;
using DoctorPatientTracking.Persistence.Data;
using DoctorPatientTracking.Persistence.Repositories;
using DoctorPatientTracking.Services.Implementation;
using DoctorPatientTracking.ServicesAbstraction.Contracts;
using DoctorPatientTracking.Shared;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;

namespace DoctorPatientTracking.API;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        #region Services

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();
        builder.Services.AddMemoryCache();
        builder.Services.AddDbContext<ApplicationDbContext>(e =>
            e.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
        {
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireDigit = true;
            options.User.RequireUniqueEmail = true;
        }).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
        builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration.GetRequiredSection("JWT")["Issuer"],
                ValidAudience = builder.Configuration.GetRequiredSection("JWT")["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetRequiredSection("JWT")["SecretKey"]!)),
                ClockSkew = TimeSpan.Zero
            };
            options.Events = new JwtBearerEvents
            {
                OnTokenValidated = ctx =>
                {
                    var tenant = ctx.HttpContext.RequestServices.GetRequiredService<ITenantProvider>();
                    if (ctx.Principal?.FindFirst("tenant_id")?.Value != tenant.TenantId.ToString())
                        ctx.Fail("Token does not belong to this clinic.");
                    return Task.CompletedTask;
                }
            };
        });
        builder.Services.AddScoped<ITenantProvider, TenantProvider>();
        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
        builder.Services.AddScoped<IRefreshTokenRepo, RefreshTokenRepo>();
        builder.Services.AddScoped<IDataSeeding, DataSeeding>();
        builder.Services.AddScoped<IClinicServiceService, ClinicServiceService>();
        builder.Services.AddScoped<IClinicService, ClinicDetailsService>();
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
        builder.Services.AddScoped<ITimeOfWorkService, TimeOfWorkService>();
        builder.Services.AddScoped<IDaysTimeWorkRepo, DaysTimeWorkRepo>();
        builder.Services.AddScoped<IHolidaysService, HolidaysService>();
        builder.Services.AddScoped<IHolidaysRepo, HolidaysRepo>();

        #endregion Services

        var app = builder.Build();

        using (var scoped = app.Services.CreateScope())
        {
            var objectOfDateSeed = scoped.ServiceProvider.GetRequiredService<IDataSeeding>();
            await objectOfDateSeed.Seeding();
            if (app.Environment.IsDevelopment())
                await objectOfDateSeed.SeedingTestingTenant();
        }

        #region Pipelines

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseMiddleware<GlobalExceptionMiddleware>();
        app.UseMiddleware<TenantResolutionMiddleware>();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        #endregion Pipelines

        app.Run();
    }
}