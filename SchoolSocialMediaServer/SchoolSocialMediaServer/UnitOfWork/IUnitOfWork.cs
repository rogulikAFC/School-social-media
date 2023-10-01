namespace SchoolSocialMediaServer.Repositories
{
    public interface IUnitOfWork
    {
        ISchoolRepository SchoolRepository { get; }
        Task<bool> SaveChangesAsync();
    }
}
