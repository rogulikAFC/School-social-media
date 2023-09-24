using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSocialMediaServer.Entities
{
    public class School
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string City { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? ImageFileName { get; set; }

        public static string ImageFilesDirectory { get; } = "Images/SchoolImages/";
        
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

        public ICollection<Article> Articles { get; set; } = new List<Article>();

        public ICollection<User> Users { get; set; } = new List<User>();

        public School() { }

        public School(string city, string address, string imageFileName)
        {
            City = city;
            Address = address;
            ImageFileName = imageFileName;
        }
    }
}
