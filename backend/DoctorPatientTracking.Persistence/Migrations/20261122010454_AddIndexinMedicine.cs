using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoctorPatientTracking.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexinMedicine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Medicines",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                collation: "Latin1_General_100_CI_AS",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.CreateIndex(
                name: "IX_ClinicQueues_TenantId_QueueNumber_AppointmentDate",
                table: "ClinicQueues",
                columns: new[] { "TenantId", "QueueNumber", "AppointmentDate" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClinicQueues_TenantId_QueueNumber_AppointmentDate",
                table: "ClinicQueues");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Medicines",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldCollation: "Latin1_General_100_CI_AS");
        }
    }
}