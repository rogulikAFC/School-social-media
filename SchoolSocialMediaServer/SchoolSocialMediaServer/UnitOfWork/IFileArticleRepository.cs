using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public interface IFileArticleRepository
    {
        public Task<ICollection<FileArticle>> ListAsync(
            int pageNum, int pageSize, Guid schoolId,
            Guid? categoryId);
        Task<FileArticle?> GetByIdAsync(Guid id);
        void Add(FileArticle article);
        void Delete(FileArticle article);
    }
}
