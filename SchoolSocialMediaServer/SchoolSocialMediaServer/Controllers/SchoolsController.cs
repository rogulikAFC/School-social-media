using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;
using System.Net.WebSockets;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SchoolsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<SchoolDto>>> ListSchools(
            [FromQuery] int pageNum = 1, [FromQuery] int pageSize = 5)
        {
            var schoolEntities = await _unitOfWork.SchoolRepository
                .GetSchoolsAsync(pageNum, pageSize);

            var schoolDtos = new List<SchoolDto>();

            foreach (var schoolEntity in schoolEntities)
            {
                var schoolDto = _mapper.Map<SchoolDto>(schoolEntity);
                schoolDtos.Add(schoolDto);
            }

            return schoolDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SchoolDto>> GetSchool(Guid id)
        {
            var schoolEntity = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(id);

            if (schoolEntity == null)
            {
                return NotFound();
            }

            var schoolDto = _mapper.Map<SchoolDto>(schoolEntity);

            return schoolDto;
        }

        [HttpPost]
        public async Task<ActionResult<SchoolDto>> CreateSchool(
            SchoolForCreateDto schoolForCreateDto)
        {
            var schoolEntity = _mapper.Map<School>(schoolForCreateDto);

            _unitOfWork.SchoolRepository.Add(schoolEntity);


            var schoolDto = _mapper.Map<SchoolDto>(schoolEntity);

            var creatorUser = await _unitOfWork.UserRepository
                .GetByIdAsync(schoolForCreateDto.CreatorUserId);

            if (creatorUser == null)
            {
                return NotFound(nameof(schoolForCreateDto.CreatorUserId));
            }

            _unitOfWork.UserRepository.AddAdminStatus(creatorUser, schoolEntity);

            await _unitOfWork.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSchool), new
            {
                schoolEntity.Id,
            },
            schoolDto);
        }

        [HttpPut("{id}/by_admin/{userId}")]
        public async Task<ActionResult> ChangeSchool(
            Guid id, Guid userId, SchoolForChangeDto schoolForChangeDto)
        {
            if (!await _unitOfWork.UserRepository.IsAdminAsync(userId, id))
            {
                return Unauthorized();
            }

            var schoolEntity = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(id);

            if (schoolEntity == null)
            {
                return NotFound(nameof(schoolEntity.Id));
            }

            _mapper.Map(schoolForChangeDto, schoolEntity);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}/by_admin/{userId}")]
        public async Task<ActionResult> DeleteSchool(Guid id, Guid userId)
        {
            if (!await _unitOfWork.UserRepository.IsAdminAsync(userId, id))
            {
                return Unauthorized();
            }
            
            var schoolEntity = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(id);

            if (schoolEntity == null)
            {
                return NotFound();
            }

            _unitOfWork.SchoolRepository.Delete(schoolEntity);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/add_image/by_admin/{userId}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<string>> AddSchoolImage(
            Guid id, Guid userId, [FromForm] AddImageDto addImageDto)
        {
            await RemoveImage(id, userId);

            if (!await _unitOfWork.UserRepository.IsAdminAsync(userId, id))
            {
                return Unauthorized();
            }

            var schoolEntity = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(id);

            if (schoolEntity == null)
            {
                return NotFound();
            }

            var image = addImageDto.Image;

            var fileExtension = Path.GetExtension(image.FileName);

            var fileName = Guid.NewGuid().ToString() + fileExtension;

            var projectDirectory = Directory.GetCurrentDirectory();

            if (projectDirectory == null)
            {
                throw new Exception("Saving error");
            }

            var schoolImagesPath = Path.Combine(
                projectDirectory, School.ImageFilesDirectory);

            var filePath = new PhysicalFileProvider(schoolImagesPath).Root + fileName;

            var fileStream = System.IO.File.Create(filePath);

            await image.CopyToAsync(fileStream);

            fileStream.Flush();

            fileStream.Close();

            schoolEntity.ImageFileName = fileName;

            await _unitOfWork.SaveChangesAsync();

            if (schoolEntity.ImagePath == null)
            {
                return BadRequest();
            }

            return schoolEntity.ImagePath;
        }

        [HttpDelete("{id}/remove_image/by_admin/{userId}")]
        public async Task<ActionResult> RemoveImage(Guid id, Guid userId)
        {
            if (!await _unitOfWork.UserRepository.IsAdminAsync(userId, id))
            {
                return Unauthorized();
            }

            var schoolEntity = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(id);

            if (schoolEntity == null)
            {
                return NotFound();
            }

            if (schoolEntity.ImagePath == null)
            {
                return BadRequest(nameof(schoolEntity.ImagePath));
            }
            
            var projectDirectory = Directory.GetCurrentDirectory();

            if (projectDirectory == null)
            {
                throw new Exception();
            }

            var imagePath = Path.Combine(
                projectDirectory, schoolEntity.ImagePath);

            System.IO.File.Delete(imagePath);

            schoolEntity.ImageFileName = null;

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{schoolId}/user/{userId}/make_admin/by_user/{adminId}")]
        public async Task<ActionResult> MakeUserAdmin(
            Guid schoolId, Guid userId, Guid adminId)
        {
            var isUserAdmin = await _unitOfWork.UserRepository
                .IsAdminAsync(schoolId, adminId);

            if (!isUserAdmin)
            {
                return Unauthorized(nameof(adminId));
            }

            var school = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(schoolId);

            if (school == null)
            {
                return NotFound(nameof(school));
            }

            var user = await _unitOfWork.UserRepository
                .GetByIdAsync(userId);

            if (user == null)
            {
                return NotFound(nameof(userId));
            }

            _unitOfWork.UserRepository.AddAdminStatus(user, school);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
