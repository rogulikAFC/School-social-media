using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.Repositories
{
    public interface ISchoolRepository
    {
        Task<IEnumerable<School>> GetSchoolsAsync(
            int pageNum, int pageSize, string? query);

        Task<School?> GetSchoolAsync(Guid? id);

        void Add(School school);

        void Delete(School school);

        Task<School?> GetSchoolWithArticlesAsync(Guid id);
    }
}
