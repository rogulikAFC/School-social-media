using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class ArticleProfile : Profile
    {
        public ArticleProfile()
        {
            CreateMap<Article, ArticleDto>()
                .BeforeMap((s, d) =>
                    d.Created = s.Created.ToString("dd.MM.yyyy HH:mm"));
        }
    }
}
