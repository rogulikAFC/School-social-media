using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class SchoolForChangeDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string City { get; set; } = null!;

        [Required]
        [MaxLength(128)]
        public string Address { get; set; } = null!;

        [Required]
        [MaxLength(32)]
        public string Name { get; set; } = null!;

    }
}
