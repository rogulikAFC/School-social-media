using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class SchoolProfile : Profile
    {
        public SchoolProfile()
        {
            CreateMap<School, SchoolDto>()
                .AfterMap((s, d) => d.ImagePath = s.ImagePathForClient);

            CreateMap<SchoolForCreateDto, School>();

            CreateMap<SchoolForChangeDto, School>();
        }
    }
}
