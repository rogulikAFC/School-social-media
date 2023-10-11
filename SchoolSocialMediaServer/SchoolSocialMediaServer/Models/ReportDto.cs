using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class ReportDto
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
    }
}
