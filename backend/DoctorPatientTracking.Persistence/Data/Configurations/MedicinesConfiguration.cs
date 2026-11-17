namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class MedicinesConfiguration : IEntityTypeConfiguration<Medicine>
    {
        public void Configure(EntityTypeBuilder<Medicine> builder)
        {
            builder.Property(e => e.Type).HasConversion<string>().HasMaxLength(20);
            builder.Property(e => e.Name).HasMaxLength(100);
            builder.HasIndex(e => e.Name).IsUnique();
        }
    }
}