using DoctorPatientTracking.Domain.Abstractions.Specifications;
using System.Linq.Expressions;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class SecretarySpecification : BaseSpecification<ApplicationUser>
    {
        public SecretarySpecification(Guid tenantId, string phone)
            : base(Build(tenantId, phone))
        {
        }

        private static Expression<Func<ApplicationUser, bool>> Build(Guid tenantId, string phone)
        {
            string userName = $"{tenantId:N}_{phone}";
            return e => e.TenantId == tenantId && (e.PhoneNumber == phone || e.UserName == userName);
        }
    }
}