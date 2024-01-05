using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public interface ICategoryRepository
    {
        Task<Category?> GetAsync(Guid id);
        Task<IEnumerable<Category>> ListAsync();
        Task<IEnumerable<Category>> ListCategoriesByHasContentTypeAsync(
            Guid schoolId, string contentType);
        void Add(Category category);
        void Delete(Category category);
    }
}
