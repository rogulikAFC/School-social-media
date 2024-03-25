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

        public async Task<IEnumerable<Category>> ListAsync(string? query, string? dataType)
        {
            var categories = await _socialMediaDbContext.Categories
                .Include(c => c.Articles)
                .Include(c => c.FileArticles)
                .Where(c => query == null
                    || c.Name.ToLower().Contains(query.ToLower()))
                .ToListAsync();

            return categories.Where(c => dataType == null
                || c.DataType.ToString().ToLower().Contains(dataType));
        }

        public async Task<IEnumerable<Category>> ListCategoriesByHasContentTypeAsync(
            Guid schoolId, string contentType)
        {
            Console.WriteLine(contentType.ToLower());

            return await _socialMediaDbContext.Categories
                .Where(c => contentType != "articles"
                    || c.Articles.Any(a => a.SchoolId == schoolId))
                .Where(c => contentType != "fileArticles"
                    || c.FileArticles.Any(a => a.SchoolId == schoolId))
                .AsNoTracking()
                .ToListAsync();
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
