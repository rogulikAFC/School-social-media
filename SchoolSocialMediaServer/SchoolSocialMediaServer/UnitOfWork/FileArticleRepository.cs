using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using SchoolSocialMediaServer.Models;
using System.Security.Cryptography.X509Certificates;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public class FileArticleRepository : IFileArticleRepository
    {
        private readonly SchoolSocialMediaDbContext _context;

        public FileArticleRepository(SchoolSocialMediaDbContext context)
        {
            _context = context
                ?? throw new ArgumentNullException(nameof(context));
        }

        public void Add(FileArticle article)
        {
            _context.FileArticles.Add(article);
        }

        public void Delete(FileArticle article)
        {
            _context.FileArticles.Remove(article);
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
