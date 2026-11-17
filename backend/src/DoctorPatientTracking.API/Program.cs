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

        #endregion Services

        var app = builder.Build();

        #region Pipelines

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        #endregion Pipelines

        app.Run();
    }
}