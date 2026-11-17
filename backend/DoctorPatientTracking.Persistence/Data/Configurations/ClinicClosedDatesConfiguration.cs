namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class ClinicClosedDatesConfiguration : IEntityTypeConfiguration<ClinicClosedDate>
    {
        public void Configure(EntityTypeBuilder<ClinicClosedDate> builder)
        {
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}