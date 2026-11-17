using DoctorPatientTracking.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class DoctorReviewMedicinesConfiguration : IEntityTypeConfiguration<DoctorReviewMedicine>
    {
        public void Configure(EntityTypeBuilder<DoctorReviewMedicine> builder)
        {
            builder.HasKey(e => new { e.DoctorReviewId, e.MedicinesId });
            builder.Property(e => e.Dosage).HasMaxLength(100);
            builder.Property(e => e.Details).HasMaxLength(300);
            builder.HasOne(e => e.DoctorReview).WithMany(e => e.Medicines).HasForeignKey(e => e.DoctorReviewId);
            builder.HasOne(e => e.Medicines).WithMany().HasForeignKey(e => e.MedicinesId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}