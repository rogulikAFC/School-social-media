using SchoolSocialMediaServer.DbContexts;
using SchoolSocialMediaServer.UnitOfWork;

namespace SchoolSocialMediaServer.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SchoolSocialMediaDbContext _socialMediaDbContext;

        public UnitOfWork(SchoolSocialMediaDbContext socialMediaDbContext)
        {
            _socialMediaDbContext = socialMediaDbContext
                ?? throw new ArgumentNullException(nameof(socialMediaDbContext));

            SchoolRepository = new SchoolRepository(_socialMediaDbContext);
            CategoryRepository = new CategoryRepository(_socialMediaDbContext);
            ArticleRepository = new ArticleRepository(_socialMediaDbContext, CategoryRepository);
            UserRepository = new UserRepository(_socialMediaDbContext);
            ReportRepository = new ReportRepository(_socialMediaDbContext);
            FileArticleRepository = new FileArticleRepository(_socialMediaDbContext, CategoryRepository);
        }

        public ISchoolRepository SchoolRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IArticleRepository ArticleRepository { get; }
        public IUserRepository UserRepository { get; }
        public IReportRepository ReportRepository { get; }
        public IFileArticleRepository FileArticleRepository { get; }

        public async Task<bool> SaveChangesAsync()
        {
            return await _socialMediaDbContext.SaveChangesAsync() >= 0;
        }
    }
}
