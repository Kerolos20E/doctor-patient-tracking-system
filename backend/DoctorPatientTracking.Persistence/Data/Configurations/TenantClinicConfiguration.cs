using DoctorPatientTracking.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class TenantClinicConfiguration : IEntityTypeConfiguration<TenantClinic>
    {
        public void Configure(EntityTypeBuilder<TenantClinic> builder)
        {
            builder.Property(e => e.NameOfClinic).HasMaxLength(200);
            builder.Property(e => e.LogoUrl).HasMaxLength(300);
            builder.Property(e => e.Specialty).HasMaxLength(50);
            builder.Property(e => e.Governorate).HasMaxLength(50);
            builder.Property(e => e.City).HasMaxLength(50);
            builder.Property(e => e.AddressDetails).HasMaxLength(300);
            builder.Property(e => e.AddressLocationUrl).HasMaxLength(300);
            builder.Property(e => e.Status).HasConversion<string>().HasMaxLength(15);
            builder.Property(e => e.Subdomain).HasMaxLength(30);
            builder.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            builder.Property(e => e.PhoneNumber).HasMaxLength(20);
            builder.Property(e => e.Email).HasMaxLength(300);
            builder.HasIndex(e => e.Email).IsUnique();
            builder.HasIndex(e => e.PhoneNumber).IsUnique();
        }
    }
}