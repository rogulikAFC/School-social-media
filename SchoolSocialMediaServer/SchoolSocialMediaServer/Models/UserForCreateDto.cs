using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class UserForCreateDto
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public Guid SchoolId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
    }
}
