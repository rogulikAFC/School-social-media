using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class School
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength(32)]
        public string City { get; set; } = null!;

        [MaxLength(128)]
        public string Address { get; set; } = null!;

        public string FullAddress
        {
            get
            {
                return $"{City}, {Address}";
            }
        }

        [MaxLength(32)]
        public string Name { get; set; } = null!;

        public string NameWithAddress
        {
            get
            {
                return $"{Name} ({FullAddress})";
            }
        }

        public string? ImageFileName { get; set; }

        public static string ImageFilesDirectory { get; } = "wwwroot/Images/SchoolImages/";
        
        public string? ImagePath
        {
            get
            {
                if (ImageFileName == null)
                {
                    return null;
                }

                return Path.Combine(ImageFilesDirectory, ImageFileName);
            }
        }

        public ICollection<Article> Articles { get; set; } = new List<Article>();

        public ICollection<User> Users { get; set; } = new List<User>();

        public School() { }
    }
}
