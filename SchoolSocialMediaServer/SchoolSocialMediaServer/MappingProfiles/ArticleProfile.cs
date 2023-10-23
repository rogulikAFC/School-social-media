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
                {
                    d.CreatedUTC = s.Created.ToString();
                    d.PreviewImagePath = s.PreviewImageForClient;
                });

            CreateMap<Article, ArticleForPreviewDto>()
                .AfterMap((s, d) =>
                {
                    d.CreatedUTC = s.Created.ToString();
                    d.PreviewImagePath = s.PreviewImageForClient;
                });

            CreateMap<Article, ArticleWithReportsDto>()
                .AfterMap((s, d) =>
                {
                    d.CreatedUTC = s.Created.ToString();
                    d.PreviewImagePath = s.PreviewImageForClient;
                });

            CreateMap<ArticleForCreateDto, Article>();
        }
    }
}
