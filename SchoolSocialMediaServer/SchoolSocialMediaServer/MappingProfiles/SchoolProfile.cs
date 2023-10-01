using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class SchoolProfile : Profile
    {
        public SchoolProfile()
        {
            CreateMap<School, SchoolDto>();
            CreateMap<SchoolForCreateDto, School>();
            CreateMap<SchoolForChangeDto, School>();
        }
    }
}
