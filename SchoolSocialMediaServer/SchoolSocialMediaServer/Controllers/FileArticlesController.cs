using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;
using SchoolSocialMediaServer.Services;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileArticlesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public FileArticlesController(IUnitOfWork unitOfWork, IMapper mapper, IFileService fileService)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));

            _fileService = fileService
                ?? throw new ArgumentNullException(nameof(fileService));
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
                return NotFound(nameof(id));

            return Ok(_mapper.Map<FileArticleDto>(fileArticle));
        }

        [Consumes("multipart/form-data")]
        [HttpPost("by_admin/{adminId}")]
        public async Task<ActionResult<FileArticle>> PostFileArticle(
            Guid adminId, [FromForm] FileArticleForCreateDto fileArticleForCreateDto)
        {
            var isSchoolExist = await _unitOfWork.SchoolRepository
                .GetByIdAsync(fileArticleForCreateDto.SchoolId) != null;

            if (!isSchoolExist)
                return NotFound(nameof(fileArticleForCreateDto.SchoolId));

            var isCategoryExist = await _unitOfWork.CategoryRepository
                .GetAsync(fileArticleForCreateDto.CategoryId) != null;

            if (!isCategoryExist)
                return NotFound(nameof(fileArticleForCreateDto.CategoryId));

            var isUserAdmin = await _unitOfWork.UserRepository.IsAdminAsync(
                adminId, fileArticleForCreateDto.SchoolId);

            if (!isUserAdmin)
                return Unauthorized(nameof(adminId));

            var fileArticle = _mapper.Map<FileArticle>(fileArticleForCreateDto);

            var file = fileArticleForCreateDto.File;

            fileArticle.FileName = await _fileService.UploadFile(file, FileArticle.FilesDirectory);

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
                return NotFound();

            _fileService.DeleteFile(fileArticle.FilePathForServer);

            _unitOfWork.FileArticleRepository.Delete(fileArticle);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
