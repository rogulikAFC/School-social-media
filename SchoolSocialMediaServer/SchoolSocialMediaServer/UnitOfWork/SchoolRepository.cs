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

        public async Task<IEnumerable<School>> GetSchoolsAsync(
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

        public async Task<School?> GetSchoolWithArticlesAsync(Guid id)
        {
            return await _socialMediaDbContext.Schools
                .Include(s => s.Articles)
                .ThenInclude(a => a.Reports)
                .Include(s => s.Articles)
                .ThenInclude(a => a.User)
                .Include(s => s.Articles)
                .ThenInclude(a => a.Category)
                .FirstOrDefaultAsync();
        }
    }
}
