using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        public int ProfileViewCount { get; set; }

        public string? ImageFileName { get; set; }

        public static string ImageFilesDirectory { get; } = "wwwroot/Images/UserImages/";

        public string? ImagePath
        {
            get
            {
                if (ImageFileName == null)
                {
                    return null;
                }

                return ImageFilesDirectory + ImageFileName;
            }
        }

        public string? ImagePathForClient
        {
            get
            {
                if (ImageFileName == null)
                {
                    return null;
                }

                return "/Images/UserImages/" + ImageFileName;
            }
        }

        public virtual ICollection<Article> Articles { get; } = new List<Article>();

        public Guid? SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public School? School { get; set; }

        public virtual ICollection<AdminStatus> AdminStatuses { get; }
            = new List<AdminStatus>();

        public virtual int Karma { get; set; } = 0;

        public virtual ICollection<Vote> Votes { get; } = new List<Vote>();

        public User() { }

        public User(string name, Guid schoolId, string? imageFileName)
        {
            Name = name;
            ImageFileName = imageFileName;
            SchoolId = schoolId;
        }
    }
}
