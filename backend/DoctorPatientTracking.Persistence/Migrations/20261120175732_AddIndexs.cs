using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoctorPatientTracking.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClinicQueues_TenantId",
                table: "ClinicQueues");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicQueues_TenantId_PatientId_AppointmentDate",
                table: "ClinicQueues",
                columns: new[] { "TenantId", "PatientId", "AppointmentDate" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TenantId_PhoneNumber",
                table: "AspNetUsers",
                columns: new[] { "TenantId", "PhoneNumber" },
                unique: true,
                filter: "[PhoneNumber] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClinicQueues_TenantId_PatientId_AppointmentDate",
                table: "ClinicQueues");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TenantId_PhoneNumber",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicQueues_TenantId",
                table: "ClinicQueues",
                column: "TenantId");
        }
    }
}
