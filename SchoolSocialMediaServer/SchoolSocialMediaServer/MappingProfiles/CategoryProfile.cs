using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryWithArticlesDto>();
            CreateMap<Category, CategoryWithoutArticlesDto>();
            CreateMap<CategoryForCreateDto, Category>();
        }
    }
}
