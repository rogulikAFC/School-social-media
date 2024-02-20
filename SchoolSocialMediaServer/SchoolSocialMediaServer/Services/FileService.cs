using Microsoft.Extensions.FileProviders;

namespace SchoolSocialMediaServer.Services
{
    public class FileService : IFileService
    {
        public void DeleteFile(string filePath)
        {
            var projectDirectory = Directory.GetCurrentDirectory()
                ?? throw new Exception("Cannot find project directory");

            File.Delete(Path.Combine(projectDirectory, filePath));
        }

        public async Task<string> UploadFile(IFormFile file, string directory)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var projectDirectory = Directory.GetCurrentDirectory() 
                ?? throw new Exception("Cannot find project directory");

            var fileStream = File.Create(Path.Combine(
                projectDirectory, directory, Path.GetFileName(fileName)));

            await file.CopyToAsync(fileStream);

            fileStream.Close();

            return fileName;
        }
    }
}
