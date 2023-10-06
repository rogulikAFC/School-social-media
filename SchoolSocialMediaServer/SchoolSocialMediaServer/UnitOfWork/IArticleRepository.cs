using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public interface IArticleRepository
    {
        Task<IEnumerable<Article>> ListAsync(
            int pageNum, int pageSize,
            Guid? schoolId, Guid? categoryId, Guid? userId);
        Task<Article?> GetByIdAsync(Guid id);
        void Add(Article article);
        void Delete(Article article);
    }
}
