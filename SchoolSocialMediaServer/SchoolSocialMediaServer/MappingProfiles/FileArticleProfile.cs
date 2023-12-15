using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class FileArticleProfile : Profile
    {
        public FileArticleProfile()
        {
            CreateMap<FileArticle, FileArticleDto>()
                .AfterMap((s, d) =>
                {
                    d.CreatedUTC = s.CreatedUTC.ToString();
                });

            CreateMap<FileArticleForCreateDto, FileArticle>();
        }
    }
}
