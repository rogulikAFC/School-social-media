using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ListAsync(int pageNum, int pageSize);
        Task<User?> GetByIdAsync(Guid id);
        void Add(User user);
        void Delete(User user);
        void AddAdminStatus(User user, School school);
        Task<bool> IsAdminAsync(Guid userId, Guid schoolId);
    }
}
