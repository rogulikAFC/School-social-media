using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class Article
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Title { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        public Guid? CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        public ICollection<ArticleView> Views { get; set; } = new List<ArticleView>();

        public int ViewsCount
        {
            get { return Views.Count; }
        }

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        public Guid SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public School School { get; set; } = null!;

        public ICollection<Vote> Votes { get; } = new List<Vote>();

        public ICollection<Report> Reports { get; } = new List<Report>();

        public int Rating
        {
            get
            {
                var rating = 0;

                foreach (var vote in Votes)
                {
                    rating += vote.Value;
                }

                return rating;
            }
        }

        public DateTimeOffset Created { get; set; } = DateTimeOffset.UtcNow;
    }
}
