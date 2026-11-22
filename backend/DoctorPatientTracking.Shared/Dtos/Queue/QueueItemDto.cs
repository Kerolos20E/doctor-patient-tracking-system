namespace DoctorPatientTracking.Shared.Dtos.Queue
{
    public record QueueItemDto
    {
        public Guid ClinicQueueId { get; init; }
        public int QueueNumber { get; init; }
        public string PatientFullName { get; init; } = string.Empty;
        public string PatientPhone { get; init; } = string.Empty;
    }
}