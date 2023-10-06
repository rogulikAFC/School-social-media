using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UsersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));
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
            var school = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(userForCreateDto.SchoolId);

            if (school == null)
            {
                return NotFound(userForCreateDto.SchoolId);
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
            var school = await _unitOfWork.SchoolRepository
                .GetSchoolAsync(userForUpdateDto.SchoolId);

            if (school == null)
            {
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
            {
                return NotFound(nameof(id));
            }

            _unitOfWork.UserRepository.Delete(user);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
