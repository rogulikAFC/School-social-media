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

            CreateMap<Category, CategoryWithoutArticlesDto>()
                .BeforeMap((s, d) => d.DataType = s.DataType.ToString());
            
            CreateMap<CategoryForCreateDto, Category>();
        }
    }
}
