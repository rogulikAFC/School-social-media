using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.UnitOfWork
{
    public interface ICategoryRepository
    {
        Task<Category?> GetAsync(Guid id);
        Task<IEnumerable<Category>> ListAsync(string? query, string? dataType);
        Task<IEnumerable<Category>> ListCategoriesByHasContentTypeAsync(
            Guid schoolId, string contentType);
        void Add(Category category);
        //void SetCategoryDataType(Category category);
        void Delete(Category category);
    }
}
