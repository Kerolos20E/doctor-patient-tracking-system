using DoctorPatientTracking.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class DoctorReviewConfiguration : IEntityTypeConfiguration<DoctorReview>
    {
        public void Configure(EntityTypeBuilder<DoctorReview> builder)
        {
            builder.Property(e => e.Notes).HasMaxLength(300);
            builder.HasOne(e => e.ClinicQueue).WithOne(e => e.DoctorReview).HasForeignKey<DoctorReview>(e => e.ClinicQueueId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}