namespace SchoolSocialMediaServer.Services
{
    public interface IFileService
    {
        public Task<string> UploadFile(IFormFile file, string directory);
        public void DeleteFile(string filePath);
    }
}
