using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.Queue
{
    public record UpdateQueueStatusDto
    {
        public ClinicQueueStatus Status { get; init; }
    }
}
