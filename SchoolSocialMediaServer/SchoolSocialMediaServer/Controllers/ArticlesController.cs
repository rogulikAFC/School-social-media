using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ArticlesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleForPreviewDto>>> ListArticles(
            [FromQuery] Guid? schoolId, [FromQuery] Guid? categoryId,
            [FromQuery] int pageNum = 1, [FromQuery] int pageSize = 5)
        {
            var articles = await _unitOfWork.ArticleRepository
                .ListAsync(pageNum, pageSize, schoolId, categoryId);

            var articleDtos = new List<ArticleForPreviewDto>();

            foreach (var article in articles)
            {
                var articleDto = _mapper.Map<ArticleForPreviewDto>(article);
                articleDtos.Add(articleDto);
            }

            return articleDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetArticleById(Guid id)
        {
            var article = await _unitOfWork.ArticleRepository
                .GetByIdAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            var articleDto = _mapper.Map<ArticleDto>(article);

            return Ok(articleDto);
        }

        [HttpPost]
        public async Task<ActionResult<ArticleDto>> PostArticle(
            ArticleForCreateDto articleForCreateDto)
        {
            var article = _mapper.Map<Article>(articleForCreateDto);

            _unitOfWork.ArticleRepository.Add(article);

            await _unitOfWork.SaveChangesAsync();

            var articleEntity = await _unitOfWork.ArticleRepository
                .GetByIdAsync(article.Id);

            if (articleEntity == null)
            {
                return NotFound(nameof(articleEntity));
            }

            var articleDto = _mapper.Map<ArticleDto>(articleEntity);

            return CreatedAtAction(nameof(GetArticleById), new
                {
                    article.Id,
                },
                articleDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutArticle(
            Guid id, ArticleForCreateDto articleForChangeDto)
        {
            var article = await _unitOfWork.ArticleRepository
                .GetByIdAsync(id);

            if (article == null)
            {
                return NotFound(nameof(article));
            }

            _mapper.Map(articleForChangeDto, article);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArticle(Guid id)
        {
            var article = await _unitOfWork.ArticleRepository
                .GetByIdAsync(id);

            if (article == null)
            {
                return NotFound(nameof(article));
            }

            _unitOfWork.ArticleRepository.Delete(article);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
