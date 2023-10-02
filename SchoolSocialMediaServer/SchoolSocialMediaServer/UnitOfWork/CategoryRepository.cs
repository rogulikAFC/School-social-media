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

        public CategoryRepository (SchoolSocialMediaDbContext socialMediaDbContext)
        {
            _socialMediaDbContext = socialMediaDbContext
                ?? throw new ArgumentNullException(nameof(socialMediaDbContext));
        }


        public async Task<IEnumerable<Category>> ListAsync()
        {
            return await _socialMediaDbContext.Categories.ToListAsync();
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
