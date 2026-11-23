using DoctorPatientTracking.Shared.Dtos.DoctorReview;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IDoctorReviewService
    {
        Task<ApiResponse<DoctorReviewResultDto>> CreateReview(CreateDoctorReviewDto dto);

        Task<ApiResponse<PagenatedResult<DoctorReviewResultDto>>> GetReviewsByPatient(Guid patientId, int? pageNumber, int? pageSize);

        Task<ApiResponse<PagenatedResult<DoctorReviewResultDto>>> GetMyReviews(Guid patientId, int? pageNumber, int? pageSize);

        Task<ApiResponse<DoctorReviewResultDto>> GetReviewById(Guid reviewId, Guid currentUserId, bool isDoctor);

        Task<byte[]> GenerateReviewPdf(Guid reviewId, Guid currentUserId, bool isDoctor);
    }
}