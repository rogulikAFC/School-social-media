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
            var article = await _socialMediaDbContext.Articles
                .Include(a => a.User)
                .Include(a => a.School)
                .Include(a => a.Category)
                .Include(a => a.Views)
                .Include(a => a.Votes)
                .Where(a => a.Id == id)
                .FirstOrDefaultAsync();

            if (article == null)
            {
                return null;
            }

            var view = new ArticleView();

            article.Views.Add(view);

            return article;
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
                .Include(a => a.Reports)
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
                    Votes = a.Votes,
                    Views = a.Views,
                    Reports = a.Reports
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

        public void Like(Article article, User user)
        {
            var vote = new Vote()
            {
                Value = 1
            };

            article.Votes.Add(vote);
            user.Votes.Add(vote);
        }
    }
}
