using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public class FileArticleRepository : IFileArticleRepository
    {
        private readonly SchoolSocialMediaDbContext _context;
        private readonly ICategoryRepository _categoryRepository;

        public FileArticleRepository(
            SchoolSocialMediaDbContext context, ICategoryRepository categoryRepository)
        {
            _context = context
                ?? throw new ArgumentNullException(nameof(context));

            _categoryRepository = categoryRepository
                ?? throw new ArgumentNullException(nameof(categoryRepository));
        }

        public void Add(FileArticle article)
        {
            _context.FileArticles.Add(article);

            /* if (article.Category != null)
                _categoryRepository.SetCategoryDataType(article.Category); */
        }

        public void Delete(FileArticle article)
        {
            _context.FileArticles.Remove(article);

            /*if (article.Category != null)
                _categoryRepository.SetCategoryDataType(article.Category); */
        }

        public async Task<FileArticle?> GetByIdAsync(Guid id)
        {
            return await _context.FileArticles
                .Include(a => a.Category)
                .Include(a => a.School)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<ICollection<FileArticle>> ListAsync(
            int pageNum, int pageSize, Guid schoolId,
            Guid? categoryId)
        {
            return await _context.FileArticles
                .Include(a => a.School)
                .Include(a => a.Category)
                .Where(a => a.SchoolId == schoolId)
                .Where(a => categoryId == null || a.CategoryId == categoryId)
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}
