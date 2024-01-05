using AutoMapper;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;

namespace SchoolSocialMediaServer.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .AfterMap((s, d) => d.ImagePath = s.ImagePathForClient);

            CreateMap<UserForCreateDto, User>()
                .AfterMap((s, d) => d.Password = BCrypt.Net.BCrypt.HashPassword(s.Password));
        }
    }
}
