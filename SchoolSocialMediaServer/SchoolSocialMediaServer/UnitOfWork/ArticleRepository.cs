using Microsoft.EntityFrameworkCore;
using SchoolSocialMediaServer.DbContexts;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Repositories;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly SchoolSocialMediaDbContext _socialMediaDbContext;

        public ArticleRepository(SchoolSocialMediaDbContext socialMediaDbContext)
        {
            _socialMediaDbContext = socialMediaDbContext
                ?? throw new ArgumentNullException(nameof(socialMediaDbContext));
        }

        public void Add(Article article)
        {
            _socialMediaDbContext.Articles.Add(article);
        }

        public void Delete(Article article)
        {
            _socialMediaDbContext.Articles.Remove(article);
        }

        public async Task<Article?> GetByIdAsync(Guid id)
        {
            return await _socialMediaDbContext.Articles
                .Include(a => a.User)
                .Include(a => a.School)
                .Include(a => a.Category)
                .Include(a => a.Views)
                .Include(a => a.Votes)
                .Where(a => a.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Article>> ListAsync(
            int pageNum, int pageSize,
            Guid? schoolId, Guid? categoryId, Guid? userId)
        {
            return await _socialMediaDbContext.Articles
                .Include(a => a.User)
                .Include(a => a.School)
                .Include(a => a.Category)
                .Include(a => a.Views)
                .Include(a => a.Votes)
                .Select(a => new Article
                {
                    Id = a.Id,
                    Title = a.Title,
                    CategoryId = a.CategoryId,
                    Category = a.Category,
                    SchoolId = a.SchoolId,
                    School = a.School,
                    UserId = a.UserId,
                    User = a.User,
                    Views = a.Views,
                })
                .Where(a =>
                    categoryId == null ? true : a.CategoryId == categoryId
                    &&
                    schoolId == null ? true : a.SchoolId == schoolId
                    &&
                    userId == null ? true: a.UserId == userId)
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}
