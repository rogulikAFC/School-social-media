using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string Name { get; set; } = null!;

        public ICollection<Article> Articles { get; } = new List<Article>();

        public ICollection<FileArticle> FileArticles { get; } = new List<FileArticle>();
    }
}
