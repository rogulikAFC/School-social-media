using SchoolSocialMediaServer.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class UserWithoutSchoolDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int ProfileViewCount { get; set; }
        public string? ImagePath { get; set; }
    }
}
