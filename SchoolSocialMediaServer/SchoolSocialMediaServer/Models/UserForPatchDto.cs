using System.Diagnostics.CodeAnalysis;

namespace SchoolSocialMediaServer.Models
{
    public class UserForPatchDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public Guid? SchoolId { get; set; }
    }
}
