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
            ArticleRepository = new ArticleRepository(_socialMediaDbContext);
            UserRepository = new UserRepository(_socialMediaDbContext);
        }

        public ISchoolRepository SchoolRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IArticleRepository ArticleRepository { get; }
        public IUserRepository UserRepository { get; }

        public async Task<bool> SaveChangesAsync()
        {
            return await _socialMediaDbContext.SaveChangesAsync() >= 0;
        }
    }
}
