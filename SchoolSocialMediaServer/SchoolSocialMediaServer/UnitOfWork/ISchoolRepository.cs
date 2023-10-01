using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.Repositories
{
    public interface ISchoolRepository
    {
        Task<IEnumerable<School>> GetSchoolAsync(
            int pageNum, int pageSize);

        Task<School?> GetSchoolAsync(Guid id);

        void Add(School school);

        void Delete(School school);
    }
}
