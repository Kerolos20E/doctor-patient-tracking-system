namespace DoctorPatientTracking.Persistence.Data.Configurations
{
    internal class ApplicationUsersConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.Property(e => e.FirstName).HasMaxLength(20);
            builder.Property(e => e.LastName).HasMaxLength(20);
            builder.Property(e => e.Email).HasMaxLength(300);
            builder.Property(e => e.NormalizedEmail).HasMaxLength(300);
            builder.Property(e => e.PhotoUrl).HasMaxLength(300);
            builder.Property(e => e.PhoneNumber).HasMaxLength(20);
            builder.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            builder.Property(e => e.Gender).HasConversion<string>().HasMaxLength(10);
            builder.HasIndex(e => e.NormalizedEmail).HasDatabaseName("EmailIndex").IsUnique(false);
            builder.HasIndex(e => new { e.TenantId, e.NormalizedEmail }).IsUnique();
            builder.HasIndex(e => new { e.TenantId, e.PhoneNumber }).IsUnique();
            builder.HasOne<TenantClinic>().WithMany().HasForeignKey(e => e.TenantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}