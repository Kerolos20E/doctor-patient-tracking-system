using DoctorPatientTracking.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            builder.Property(e => e.TransactionId).HasMaxLength(300);
            builder.Property(e => e.OrderId).HasMaxLength(300);
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.PaymentMethod).HasConversion<string>().HasMaxLength(15);
            builder.Property(e => e.Status).HasConversion<string>().HasMaxLength(15);
            builder.Property(e => e.Amount).HasColumnType("decimal(6,2)");
        }
    }
}