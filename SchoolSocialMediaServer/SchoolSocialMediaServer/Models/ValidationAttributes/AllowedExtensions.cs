using System.ComponentModel.DataAnnotations;

namespace SchoolSocialMediaServer.Models.ValidationAttributes
{
    public class AllowedExtensions : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedExtensions(string[] extensions)
        {
            _extensions = extensions;
        }

        public override bool IsValid(object? value)
        {
            var file = value as IFormFile;

            if (file == null)
            {
                return false;
            }

            var extension = Path.GetExtension(file.FileName);

            if (!_extensions.Contains(extension))
            {
                return false;
            }

            return true;
        }
    }
}
