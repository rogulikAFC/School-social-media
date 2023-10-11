namespace SchoolSocialMediaServer.Models
{
    public class ArticleWithReportsDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public CategoryWithoutArticlesDto? Category { get; set; }
        public int ViewsCount { get; set; }
        public UserDto User { get; set; } = null!;
        public SchoolDto School { get; set; } = null!;
        public int Rating { get; set; }
        public string CreatedUTC { get; set; } = null!;
        public IEnumerable<ReportDto> Reports { get; set; } = new List<ReportDto>();
    }
}
