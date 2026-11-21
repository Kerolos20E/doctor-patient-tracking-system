namespace DoctorPatientTracking.Shared.Dtos.Queue
{
    public record PatientQueuePositionDto
    {
        public int YourQueueNumber { get; init; }
        public int PeopleAheadOfYou { get; init; }
    }
}
