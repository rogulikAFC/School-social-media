using SchoolSocialMediaServer.Models.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class FileArticleForCreateDto
    {
        [Required]
        [MaxLength(128)]
        public string Title { get; set; } = null!;

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public Guid SchoolId { get; set; }

        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
