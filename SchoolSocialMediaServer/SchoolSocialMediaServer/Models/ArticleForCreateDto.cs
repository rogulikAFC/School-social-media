using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class ArticleForCreateDto
    {
        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        public Guid CategoryId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        public Guid SchoolId { get; set; }
    }
}
