using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
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

            CreateMap<User, UserWithoutSchoolDto>()
                .AfterMap((s, d) => d.ImagePath = s.ImagePathForClient);
        }
    }
}
