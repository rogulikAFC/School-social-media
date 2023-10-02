using SchoolSocialMediaServer.UnitOfWork;

namespace SchoolSocialMediaServer.Repositories
{
    public interface IUnitOfWork
    {
        ISchoolRepository SchoolRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        Task<bool> SaveChangesAsync();
    }
}
