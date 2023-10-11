using Microsoft.EntityFrameworkCore;
using SchoolSocialMediaServer.DbContexts;
using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public class ReportRepository : IReportRepository
    {
        private readonly SchoolSocialMediaDbContext _socialMediaDbContext;

        public ReportRepository(SchoolSocialMediaDbContext socialMediaDbContext)
        {
            _socialMediaDbContext = socialMediaDbContext
                ?? throw new ArgumentNullException(nameof(socialMediaDbContext));
        }

        public async Task<bool> DeleteReport(Report report, bool isReportTrue = false)
        {
            var sameReports = await _socialMediaDbContext.Reports
                .Where(r => r.ArticleId == report.ArticleId)
                .ToListAsync();

            if (isReportTrue)
            {
                var article = await _socialMediaDbContext.Articles
                .FindAsync(report.ArticleId);

                if (article == null)
                {
                    return false;
                }

                var user = await _socialMediaDbContext.Users
                    .FindAsync(article.UserId);

                if (user == null)
                {
                    return false;
                }

                user.Karma--;

                _socialMediaDbContext.Articles.Remove(article);
            }

            _socialMediaDbContext.Reports.RemoveRange(sameReports);

            return true;
        }

        public async Task<Report?> GetReport(Guid id)
        {
            return await _socialMediaDbContext.Reports
                .FindAsync(id);
        }
    }
}
