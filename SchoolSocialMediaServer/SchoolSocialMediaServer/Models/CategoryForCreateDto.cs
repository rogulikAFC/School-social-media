using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class CategoryForCreateDto
    {
        [Required]
        [MaxLength(32)]
        public string Name { get; set; } = null!;
    }
}
