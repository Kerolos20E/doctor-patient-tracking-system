using DoctorPatientTracking.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class DaysTimeWorkConfiguration : IEntityTypeConfiguration<DaysTimeWork>
    {
        public void Configure(EntityTypeBuilder<DaysTimeWork> builder)
        {
            builder.Property(e => e.Day).HasConversion<string>().HasMaxLength(20);
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}