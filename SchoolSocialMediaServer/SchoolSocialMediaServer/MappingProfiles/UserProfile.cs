using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserForCreateDto, User>();
        }
    }
}
