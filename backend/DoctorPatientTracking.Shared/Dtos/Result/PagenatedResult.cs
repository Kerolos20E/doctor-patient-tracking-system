namespace DoctorPatientTracking.Shared.Dtos.Result
{
    public record PagenatedResult<TData>(int PageIndex, int PageSize, int TotalCount, IEnumerable<TData> Dates)
    {
        public static ApiResponse<PagenatedResult<TData>> Success(int PageIndex, int PageSize, int TotalCount, IEnumerable<TData> Dates)
            => ApiResponse<PagenatedResult<TData>>.Success(new PagenatedResult<TData>
                (PageIndex, PageSize, TotalCount, Dates), "Retrived all Data.");
    }
}