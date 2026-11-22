using System.Text.RegularExpressions;

namespace DoctorPatientTracking.Shared
{
    public static class Helper
    {
        public static string NormalizePhone(string phone)
            => Regex.Replace(phone, "[^0-9+]", "");

        public static string NormalizUserName(string phone, Guid tenantId)
            => $"{tenantId:N}_{NormalizePhone(phone)}";
    }
}