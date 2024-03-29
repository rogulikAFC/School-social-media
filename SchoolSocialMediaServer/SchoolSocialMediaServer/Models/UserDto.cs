﻿namespace SchoolSocialMediaServer.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int ProfileViewCount { get; set; }
        public string? ImagePath { get; set; }
        public SchoolDto School { get; set; } = null!;
    }
}
