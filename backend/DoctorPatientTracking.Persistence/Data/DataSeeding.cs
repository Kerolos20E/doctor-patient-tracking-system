using DoctorPatientTracking.Shared.Enums;
using Microsoft.AspNetCore.Identity;

namespace DoctorPatientTracking.Persistence.Data
{
    public class DataSeeding(ApplicationDbContext _dbContext, UserManager<ApplicationUser> _userManager
        , RoleManager<IdentityRole<Guid>> _roleManager) : IDataSeeding
    {
        public async Task Seeding()
        {
            if (_dbContext.Database.GetPendingMigrations().Any())
                await _dbContext.Database.MigrateAsync();
            await SeedingRoles();
        }

        private async Task SeedingRoles()
        {
            if (await _roleManager.Roles.AnyAsync()) return;
            await _roleManager.CreateAsync(new("Patient"));
            await _roleManager.CreateAsync(new("Secretary"));
            await _roleManager.CreateAsync(new("Doctor"));
            await _dbContext.SaveChangesAsync();
        }

        async Task IDataSeeding.SeedingTestingTenant()
        {
            if (await _dbContext.TenantClinics.AnyAsync(e => e.Subdomain == "test")) return;
            var tenant = new TenantClinic()
            {
                Id = Guid.CreateVersion7(),
                NameOfClinic = "عيادة تجريبية",
                Governorate = "سوهاج",
                City = "سوهاج",
                Specialty = "باطنة",
                Status = TenantStatus.Active,
                Subdomain = "test",
                SubscriptionExpiryDate = new DateOnly(2027, 12, 31),
                PhoneNumber = "01000000000",
                Email = "clinic@test.com",
                AddressLocationUrl = "https://maps.app.goo.gl/BNnryizvSt5AwQ7K7",
            };
            var doctor = new ApplicationUser()
            {
                BirthDate = new DateOnly(1995, 5, 15),
                PhoneNumber = "01000000000",
                Email = "clinic@test.com",
                FirstName = "Doctor",
                LastName = "Test",
                Gender = Gender.Male,
                TenantId = tenant.Id,
                Id = Guid.CreateVersion7(),
                UserName = "DoctorTest"
            };
            await _dbContext.AddAsync(tenant);
            await _userManager.CreateAsync(doctor, "P@ssw0rd");
            await _userManager.AddToRoleAsync(doctor, "Doctor");
            await _dbContext.SaveChangesAsync();
        }
    }
}