using DoctorPatientTracking.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class MedicalTestConfiguration : IEntityTypeConfiguration<MedicalTest>
    {
        public void Configure(EntityTypeBuilder<MedicalTest> builder)
        {
            builder.Property(e => e.Type).HasConversion<string>().HasMaxLength(30);
            builder.Property(e => e.Name).HasMaxLength(50);
            builder.Property(e => e.TestUrl).HasMaxLength(300);
            builder.Property(e => e.Notes).HasMaxLength(300);
            builder.HasOne(e => e.ClinicQueue).WithMany(e => e.MedicalTests).HasForeignKey(e => e.ClinicQueueId);
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}