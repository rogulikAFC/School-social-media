using Microsoft.EntityFrameworkCore;
using SchoolSocialMediaServer.DbContexts;
using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public class CategoryRepository : ICategoryRepository
    {

        private readonly SchoolSocialMediaDbContext _socialMediaDbContext;

        public Task<Category?> GetAsync(Guid id)
        {
            return _socialMediaDbContext.Categories
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public CategoryRepository(SchoolSocialMediaDbContext socialMediaDbContext)
        {
            _socialMediaDbContext = socialMediaDbContext
                ?? throw new ArgumentNullException(nameof(socialMediaDbContext));
        }

        public async Task<IEnumerable<Category>> ListAsync(
            string? query, string? dataType, Guid? schoolId)
        {
            var categories = await _socialMediaDbContext.Categories
                .Include(c => c.Articles)
                .Include(c => c.FileArticles)

                .Where(c => query == null
                    || c.Name.ToLower().Contains(query.ToLower()))

                .Where(c => schoolId == null
                    || c.Articles.Any(a => a.SchoolId == schoolId)
                    || c.FileArticles.Any(f => f.SchoolId == schoolId))

                .AsNoTracking()
                .ToListAsync();

            return categories.Where(c => dataType == null
                || c.DataType.ToString().ToLower().Contains(dataType));
        }

        public void Add(Category category)
        {
            _socialMediaDbContext.Categories.Add(category);
        }

        public void Delete(Category category)
        {
            _socialMediaDbContext.Categories.Remove(category);
        }

    }
}
