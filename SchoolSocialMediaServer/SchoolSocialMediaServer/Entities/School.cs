﻿using System.ComponentModel.DataAnnotations;
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

                return "Images/SchoolImages/" + ImageFileName;
            }
        }

        public virtual ICollection<Article> Articles { get; } = new List<Article>();

        public virtual ICollection<FileArticle> FileArticles { get; } = new List<FileArticle>();

        public virtual ICollection<User> Users { get; } = new List<User>();

        [NotMapped]
        public virtual ICollection<Article> ReportedArticles
        {
            get
            {
                return Articles.Where(a => a.Reports.Any()).ToList();
            }
        }

        public virtual ICollection<AdminStatus> AdminStatuses { get; }
            = new List<AdminStatus>();

        [NotMapped]
        public virtual IEnumerable<User> Admins => AdminStatuses.Select(a => a.User);
        public School() { }
    }
}
