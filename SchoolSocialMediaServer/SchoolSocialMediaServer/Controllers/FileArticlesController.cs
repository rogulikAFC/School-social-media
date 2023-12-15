using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileArticlesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FileArticlesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FileArticleDto>>> ListFileArticles(
            Guid schoolId, [FromQuery] Guid? categoryId,
            [FromQuery] int pageNum = 1, [FromQuery] int pageSize = 4)
        {
            var fileArticles = await _unitOfWork.FileArticleRepository
                .ListAsync(pageNum, pageSize, schoolId, categoryId);

            var fileArticleDtos = new List<FileArticleDto>();

            foreach (var fileArticleEntity in fileArticles)
            {
                var fileArticleDto = _mapper.Map<FileArticleDto>(fileArticleEntity);

                fileArticleDtos.Add(fileArticleDto);
            }

            return Ok(fileArticleDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FileArticleDto>> GetFileArticle(Guid id)
        {
            var fileArticle = await _unitOfWork.FileArticleRepository
                .GetByIdAsync(id);

            if (fileArticle == null)
            {
                return NotFound(nameof(id));
            }

            var fileArticleDto = _mapper.Map<FileArticleDto>(fileArticle);

            return Ok(fileArticleDto);
        }

        [Consumes("multipart/form-data")]
        [HttpPost("by_admin/{adminId}")]
        public async Task<ActionResult<FileArticle>> PostFileArticle(
            Guid adminId, [FromForm] FileArticleForCreateDto fileArticleForCreateDto)
        {
            var isSchoolExist = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(fileArticleForCreateDto.SchoolId) == null ? false : true;

            if (!isSchoolExist)
            {
                return NotFound(nameof(fileArticleForCreateDto.SchoolId));
            }

            var isCategoryExist = await _unitOfWork.CategoryRepository
                .GetAsync(fileArticleForCreateDto.CategoryId) == null ? false : true;

            if (!isCategoryExist)
            {
                return NotFound(nameof(fileArticleForCreateDto.CategoryId));
            }

            var isUserAdmin = await _unitOfWork.UserRepository.IsAdminAsync(
                adminId, fileArticleForCreateDto.SchoolId);

            if (!isUserAdmin)
            {
                return Unauthorized(nameof(adminId));
            }

            var fileArticle = _mapper.Map<FileArticle>(fileArticleForCreateDto);

            var file = fileArticleForCreateDto.File;

            var fileExtension = Path.GetExtension(file.FileName);

            var fileName = Guid.NewGuid().ToString() + fileExtension;

            var projectDirectory = Directory.GetCurrentDirectory();

            if (projectDirectory == null)
            {
                throw new Exception("Saving error");
            }

            var fileDirectoryPath = Path.Combine(projectDirectory, FileArticle.FilesDirectory);

            var filePath = new PhysicalFileProvider(fileDirectoryPath).Root + fileName;

            var fileStream = System.IO.File.Create(filePath);

            await file.CopyToAsync(fileStream);

            fileStream.Flush();

            fileStream.Close();

            fileArticle.FileName = fileName;

            _unitOfWork.FileArticleRepository.Add(fileArticle);

            await _unitOfWork.SaveChangesAsync();

            if (fileArticle.FilePath == null)
            {
                return BadRequest(nameof(fileArticle.FileName));
            }

            var fileArticleDto = _mapper.Map<FileArticleDto>(fileArticle);

            return CreatedAtAction(nameof(GetFileArticle), new
                {
                    fileArticle.Id
                },
                fileArticleDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFileArticle(Guid id)
        {
            var fileArticle = await _unitOfWork.FileArticleRepository
                .GetByIdAsync(id);

            if (fileArticle == null)
            {
                return NotFound();
            }

            var projectDirectory = Directory.GetCurrentDirectory();

            if (projectDirectory == null)
            {
                throw new Exception("Error on file deleting");
            }

            var filePath = Path.Combine(
                projectDirectory, "wwwroot", fileArticle.FilePath);

            System.IO.File.Delete(filePath);

            _unitOfWork.FileArticleRepository.Delete(fileArticle);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
