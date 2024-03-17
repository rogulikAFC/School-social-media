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
        [MaxLength(128)]
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

        public ICollection<Vote> Votes { get; set; } = new List<Vote>();

        public ICollection<Report> Reports { get; set; } = new List<Report>();

        public int Rating
        {
            get
            {
                return Votes.Sum(v => v.Value);
            }
        }

        public string? PreviewImageFileName { get; set; }

        public static string PreviewImageFilesDirectory { get; } = "wwwroot/Images/ArticlePreviewsImages/";

        public string? PreviewImagePath
        {
            get
            {
                if (PreviewImageFileName == null)
                {
                    return null;
                }

                return PreviewImageFilesDirectory + PreviewImageFileName;
            }
        }

        public string? PreviewImageForClient
        {
            get
            {
                if (PreviewImageFileName == null)
                {
                    return null;
                }

                return "Images/ArticlePreviewsImages/" + PreviewImageFileName;
            }
        }

        public static string ImageFileDirectory { get; } = "wwwroot/Images/ArticleImages/";

        public static string ImageFileDirectoryForClient { get; } = "Images/ArticleImages/";

        public DateTimeOffset Created { get; set; } = DateTimeOffset.UtcNow;
    }
}
