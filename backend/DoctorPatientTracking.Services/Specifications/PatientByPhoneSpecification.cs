using DoctorPatientTracking.Domain.Abstractions.Specifications;
using System.Linq.Expressions;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class PatientByPhoneSpecification : BaseSpecification<ApplicationUser>
    {
        public PatientByPhoneSpecification(Guid tenantId, string phone)
            : base(Build(tenantId, phone))
        {
        }

        private static Expression<Func<ApplicationUser, bool>> Build(Guid tenantId, string phone)
        {
            string userName = Helper.NormalizUserName(phone, tenantId);
            return e => e.TenantId == tenantId && (e.PhoneNumber == phone || e.NormalizedUserName == userName);
        }
    }
}