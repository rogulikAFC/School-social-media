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
                .AfterMap((s, d) =>
                    d.CreatedUTC = s.Created.ToString("dd.MM.yyyy HH:mm"));

            CreateMap<Article, ArticleForPreviewDto>()
                .AfterMap((s, d) =>
                    d.CreatedUTC = s.Created.ToString("dd.MM.yyyy HH:mm"));

            CreateMap<Article, ArticleWithReportsDto>()
                .AfterMap((s, d) =>
                    d.CreatedUTC = s.Created.ToString("dd.MM.yyyy HH:mm"));

            CreateMap<ArticleForCreateDto, Article>();
        }
    }
}
