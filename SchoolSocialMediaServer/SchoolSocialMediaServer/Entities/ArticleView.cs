using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class ArticleView
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public DateTimeOffset DateTime { get; set; } = DateTimeOffset.UtcNow;

        public Guid ArticleId { get; set; }

        [ForeignKey("ArticleId")]
        public Article Article { get; set; } = null!;
    }
}
