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
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryWithoutArticlesDto>> ListCategories()
        {
            var categories = await _unitOfWork.CategoryRepository
                .ListAsync();

            var categoryDtos = new List<CategoryWithoutArticlesDto>();

            foreach (var category in categories)
            {
                var categoryDto = _mapper.Map<CategoryWithoutArticlesDto>(category);

                categoryDtos.Add(categoryDto);
            }

            return categoryDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryWithoutArticlesDto>> GetCategory(Guid id)
        {
            var category = await _unitOfWork.CategoryRepository
                .GetAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            var categoryDto = _mapper.Map<CategoryWithoutArticlesDto>(category);

            return categoryDto;
        }

        [HttpPost]
        public async Task<ActionResult<CategoryWithoutArticlesDto>> PostCategory(
            CategoryForCreateDto categoryForCreate)
        {
            var categoryEntity = _mapper.Map<Category>(categoryForCreate);
            
            _unitOfWork.CategoryRepository.Add(categoryEntity);

            await _unitOfWork.SaveChangesAsync();

            var categoryDto = _mapper.Map<CategoryWithoutArticlesDto>(categoryEntity);

            return CreatedAtAction(nameof(GetCategory),
                new
                {
                    categoryEntity.Id,
                },
                categoryDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutCategory(
            Guid id, CategoryForCreateDto categoryForUpdate)
        {
            var categoryEntity = await _unitOfWork.CategoryRepository
                .GetAsync(id);

            if (categoryEntity == null)
            {
                return NotFound(nameof(id));
            }

            _mapper.Map(categoryForUpdate, categoryEntity);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(Guid id)
        {
            var categoryEntity = await _unitOfWork.CategoryRepository
                .GetAsync(id);

            if (categoryEntity == null)
            {
                return NotFound(nameof(id));
            }

            _unitOfWork.CategoryRepository.Delete(categoryEntity);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
