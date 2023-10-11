using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class Report
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey(nameof(ArticleId))]
        public Guid ArticleId { get; set; }

        public virtual Article Article { get; set; } = null!;

        public string? Description { get; set; }
    }
}
