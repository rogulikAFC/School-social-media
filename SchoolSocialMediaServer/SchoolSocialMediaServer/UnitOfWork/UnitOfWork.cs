using SchoolSocialMediaServer.DbContexts;

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
        }

        public ISchoolRepository SchoolRepository { get; }

        public async Task<bool> SaveChangesAsync()
        {
            return await _socialMediaDbContext.SaveChangesAsync() >= 0;
        }
    }
}
