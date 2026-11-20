namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class ClinicQueueConfiguration : IEntityTypeConfiguration<ClinicQueue>
    {
        public void Configure(EntityTypeBuilder<ClinicQueue> builder)
        {
            builder.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);
            builder.HasOne(e => e.ClinicService).WithMany().HasForeignKey(e => e.ClinicServiceId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Patient).WithMany(e => e.ClinicQueues).HasForeignKey(e => e.PatientId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Booking).WithOne(e => e.ClinicQueue).HasForeignKey<Booking>(e => e.ClinicQueueId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
            builder.HasIndex(e => new { e.TenantId, e.PatientId, e.AppointmentDate }).IsUnique();
        }
    }
}