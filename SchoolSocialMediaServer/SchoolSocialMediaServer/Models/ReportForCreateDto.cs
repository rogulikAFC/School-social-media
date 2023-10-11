using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class ReportForCreateDto
    {
        [Required]
        public Guid ArticleId { get; set; }

        [Required]
        public string? Description { get; set; }
    }
}
