using DoctorPatientTracking.Domain.Abstractions;
using DoctorPatientTracking.Persistence.Data.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Reflection;

namespace DoctorPatientTracking.Persistence.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        private readonly ITenantProvider _tenant;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ITenantProvider tenant)
            : base(options)
        {
            _tenant = tenant;
        }

        private Guid CurrentTenantId => _tenant.TenantId;
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ClinicClosedDate> ClinicClosedDates { get; set; }
        public DbSet<ClinicQueue> ClinicQueues { get; set; }
        public DbSet<ClinicService> ClinicServices { get; set; }
        public DbSet<DaysTimeWork> DaysTimeWorks { get; set; }
        public DbSet<DoctorReview> DoctorReviews { get; set; }
        public DbSet<DoctorReviewMedicine> DoctorReviewMedicines { get; set; }
        public DbSet<MedicalTest> MedicalTests { get; set; }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<TenantClinic> TenantClinics { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationUsersConfiguration).Assembly);
            var applyFilter = typeof(ApplicationDbContext)
                .GetMethod(nameof(ApplyTenantFilter), BindingFlags.Instance | BindingFlags.NonPublic)!;
            foreach (var entityType in builder.Model.GetEntityTypes()
                .Where(t => typeof(IHaveTenant).IsAssignableFrom(t.ClrType)))
            {
                applyFilter.MakeGenericMethod(entityType.ClrType)
                    .Invoke(this, new object[] { builder });
            }
        }

        private void ApplyTenantFilter<T>(ModelBuilder modelBuilder) where T : class, IHaveTenant
        {
            modelBuilder.Entity<T>().HasQueryFilter("Tenant", e => e.TenantId == CurrentTenantId);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            StampTenant();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            StampTenant();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void StampTenant()
        {
            foreach (var entry in ChangeTracker.Entries<IHaveTenant>()
                         .Where(e => e.State is EntityState.Added or EntityState.Modified))
            {
                var entity = entry.Entity;

                if (entry.State == EntityState.Added && entity.TenantId == Guid.Empty)
                {
                    if (!_tenant.HasTenant)
                        throw new InvalidOperationException(
                            $"No tenant resolved while adding {entry.Metadata.ClrType.Name}.");

                    entity.TenantId = _tenant.TenantId;
                }
                else if (_tenant.HasTenant && entity.TenantId != _tenant.TenantId)
                {
                    throw new InvalidOperationException("Cross-tenant write blocked.");
                }
            }
        }
    }
}