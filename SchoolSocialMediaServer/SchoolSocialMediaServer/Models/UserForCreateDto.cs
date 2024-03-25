using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models
{
    public class UserForCreateDto
    {
        [Required]
        public string Name { get; set; } = null!;

        public Guid? SchoolId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [RegularExpression("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$",
            ErrorMessage = "Пароль не надежный. Он должен иметь минимум 7 символов, состоять из латинских букв и содержать как минимум 1 цифру и 1 заглавную букву")]
        public string Password { get; set; } = null!;
    }
}
