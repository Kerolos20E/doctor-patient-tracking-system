using System.ComponentModel.DataAnnotations;

namespace DoctorPatientTracking.Shared.Dtos.ClinicService
{
    public record AddSecretaryDto
    {
        [Phone, Required, MaxLength(20)]
        public string Phone { get; init; } = string.Empty;
    }
}
