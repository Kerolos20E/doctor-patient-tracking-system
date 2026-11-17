using DoctorPatientTracking.API.Tenant;
using DoctorPatientTracking.Domain.Abstractions;
using DoctorPatientTracking.Persistence.Data;
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
        builder.Services.AddIdentity<ApplicationDbContext, IdentityRole<Guid>>(options =>
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
        });

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