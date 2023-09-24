namespace SchoolSocialMediaServer.Models
{
    public class CategoryWithArticlesDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public IEnumerable<ArticleDto> Articles { get; set; } = new List<ArticleDto>();
    }
}
