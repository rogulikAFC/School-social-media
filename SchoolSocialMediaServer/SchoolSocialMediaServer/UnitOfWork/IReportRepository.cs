using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public interface IReportRepository
    {
        Task<Report?> GetReport(Guid id);
        Task<bool> DeleteReport(Report report, bool isReportTrue = false);
    }
}
