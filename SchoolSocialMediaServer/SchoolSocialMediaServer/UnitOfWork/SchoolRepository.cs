using Microsoft.EntityFrameworkCore;
using SchoolSocialMediaServer.DbContexts;
using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.Repositories
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly SchoolSocialMediaDbContext _socialMediaDbContext;

        public SchoolRepository(SchoolSocialMediaDbContext socialMediaDbContext)
        {
            _socialMediaDbContext = socialMediaDbContext
                ?? throw new ArgumentNullException(nameof(socialMediaDbContext));
        }

        public async Task<IEnumerable<School>> GetSchoolAsync(
            int pageNum, int pageSize)
        {
            return await _socialMediaDbContext.Schools
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<School?> GetSchoolAsync(Guid id)
        {
            return await _socialMediaDbContext.Schools
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public void Add(School school)
        {
            _socialMediaDbContext.Schools.Add(school);
        }

        public void Delete(School school)
        {
            _socialMediaDbContext.Schools.Remove(school);
        }
    }
}
