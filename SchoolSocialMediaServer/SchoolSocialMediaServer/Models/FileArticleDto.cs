namespace SchoolSocialMediaServer.Models
{
    public class FileArticleDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string FilePath { get; set; } = null!;
        public CategoryWithoutArticlesDto Category { get; set; } = null!;
        public SchoolDto School { get; set; } = null!;
        public string CreatedUTC { get; set; } = null!;
    }
}
