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

        public DateTime DateTime { get; set; }

        public Guid ArticleId { get; set; }

        [ForeignKey("ArticleId")]
        public Article Article { get; set; } = null!;

        public ArticleView(DateTime dateTime, Guid articleId)
        {
            DateTime = dateTime;
            ArticleId = articleId;
        }
    }
}
