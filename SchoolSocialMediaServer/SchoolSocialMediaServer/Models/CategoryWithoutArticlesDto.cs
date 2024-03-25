namespace SchoolSocialMediaServer.Models
{
    public class CategoryWithoutArticlesDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string DataType { get; set; } = null!;
    }
}
