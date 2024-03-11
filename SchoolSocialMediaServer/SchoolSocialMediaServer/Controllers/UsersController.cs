using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;
using SchoolSocialMediaServer.Services;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IFileService _imagesService;

        public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IFileService imageService)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));

            _imagesService = imageService 
                ?? throw new ArgumentException(nameof(imageService));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> ListUsers(
            [FromQuery] int pageNum = 1, [FromQuery] int pageSize = 5)
        {
            var users = await _unitOfWork.UserRepository
                .ListAsync(pageNum, pageSize);

            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var userDto = _mapper.Map<UserDto>(user);

                userDtos.Add(userDto);
            }

            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto?>> GetUserById(Guid id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound(nameof(id));
            }

            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(
            UserForCreateDto userForCreateDto)
        {
            if (userForCreateDto.SchoolId.HasValue)
            {
                var school = await _unitOfWork.SchoolRepository
                    .GetByIdAsync(userForCreateDto.SchoolId);

                if (school == null)
                    return NotFound(nameof(userForCreateDto.SchoolId));
            }

            var user = _mapper.Map<User>(userForCreateDto);

            _unitOfWork.UserRepository.Add(user);

            await _unitOfWork.SaveChangesAsync();

            var userEntity = await _unitOfWork.UserRepository
                .GetByIdAsync(user.Id);

            var userDto = _mapper.Map<UserDto>(userEntity);

            return CreatedAtAction(nameof(GetUserById),
                new
                {
                    user.Id
                },
                userDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(
            Guid id, UserForCreateDto userForUpdateDto)
        {
            if (userForUpdateDto.SchoolId.HasValue)
            {
                var school = await _unitOfWork.SchoolRepository
                    .GetByIdAsync(userForUpdateDto.SchoolId);

                if (school == null)
                    return NotFound(userForUpdateDto.SchoolId);
            }

            var user = await _unitOfWork.UserRepository
                .GetByIdAsync(id);

            if (user == null)
            {
                return NotFound(nameof(id));
            }

            _mapper.Map(userForUpdateDto, user);

            await _unitOfWork.SaveChangesAsync();
            
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            var user = await _unitOfWork.UserRepository
                .GetByIdAsync(id);

            if (user == null)
                return NotFound(nameof(id));

            _unitOfWork.UserRepository.Delete(user);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/add_image")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<string>> AddUserImage(
            [FromForm] AddImageDto addImageDto, Guid id)
        {
            var user = await _unitOfWork.UserRepository
                .GetByIdAsync(id);

            if (user == null)
                return NotFound(nameof(id));

            if (user.ImagePath != null)
                _imagesService.DeleteFile(user.ImagePath);

            var image = addImageDto.Image;

            user.ImageFileName = await _imagesService.UploadFile(
                image, Entities.User.ImageFilesDirectory);
            
            await _unitOfWork.SaveChangesAsync();

            if (user.ImagePath == null) return BadRequest(
                nameof(user.ImagePath));

            return user.ImagePathForClient!;
        }

        [HttpDelete("{id}/remove_image")]
        public async Task<ActionResult> RemoveUserImage(Guid id)
        {
            var user = await _unitOfWork.UserRepository
                .GetByIdAsync(id);

            if (user == null)
                return NotFound(nameof(id));

            if (user.ImagePath == null)
                return BadRequest(nameof(user.ImagePath));

            _imagesService.DeleteFile(user.ImagePath);

            user.ImageFileName = null;

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("by_email/{email}/sign_in")]
        public async Task<ActionResult> SignInUser(
            string email, [FromBody] string password)
        {
            var user = await _unitOfWork.UserRepository
                .GetByEmailAsync(email);

            if (user == null)
                return NotFound(nameof(email));

            if (!_unitOfWork.UserRepository.SignInUser(user, password))
                return Unauthorized(nameof(password));

            return NoContent();
        }

        [HttpGet("by_email/{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            var user = await _unitOfWork.UserRepository
                .GetByEmailAsync(email);

            if (user == null)
                return NotFound(nameof(email));

            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }

        [HttpPatch("{userId}")]
        public async Task<ActionResult> PatchUser(
            Guid userId, [FromBody] JsonPatchDocument patchDoc)
        {
            Console.WriteLine("Patch request executed");

            if (patchDoc == null) return BadRequest(nameof(patchDoc));

            var user = await _unitOfWork.UserRepository
                .GetByIdAsync(userId);

            if (user == null) return NotFound(nameof(userId));

            patchDoc.ApplyTo(user);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
