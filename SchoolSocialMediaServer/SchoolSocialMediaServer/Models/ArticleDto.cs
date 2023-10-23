namespace SchoolSocialMediaServer.Models
{
    public class ArticleDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public CategoryWithoutArticlesDto? Category { get; set; }
        public int ViewsCount { get; set; }
        public UserDto User { get; set; } = null!;
        public SchoolDto School { get; set; } = null!;
        public string? PreviewImagePath { get; set; }
        public int Rating { get; set; }
        public string CreatedUTC { get; set; } = null!;
    }
}
