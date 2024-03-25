using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class FileArticle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Title { get; set; } = null!;

        public string FileName { get; set; } = null!;

        public static string FilesDirectory { get; } = "wwwroot/Files/";

        public string FilePath
        {
            get
            {
                return Path.Combine("Files", FileName);
            }
        }

        [NotMapped]
        public string FilePathForServer
        {
            get
            {
                return Path.Combine(FilesDirectory, FileName);
            }
        }

        public Guid CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; } = null!;

        public Guid SchoolId { get; set; }

        [ForeignKey(nameof(SchoolId))]
        public School School { get; set; } = null!;

        public DateTimeOffset CreatedUTC { get; set; } = DateTimeOffset.UtcNow;
    }
}
