using SchoolSocialMediaServer.Models.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class AddImageDto
    {
        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png" })]
        [Required]
        public IFormFile Image { get; set; } = null!;
    }
}
