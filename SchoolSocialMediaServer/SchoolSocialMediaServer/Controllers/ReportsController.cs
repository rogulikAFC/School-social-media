using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SchoolSocialMediaServer.Entities;
using SchoolSocialMediaServer.Models;
using SchoolSocialMediaServer.Repositories;

namespace SchoolSocialMediaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReportsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork
                ?? throw new ArgumentNullException(nameof(unitOfWork));

            _mapper = mapper
                ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("school/{schoolId}")]
        public async Task<ActionResult<IEnumerable<ArticleWithReportsDto>>> ListArticlesWithReports(
            Guid schoolId)
        {
            var school = await _unitOfWork.SchoolRepository
                .GetSchoolWithArticlesAsync(schoolId);

            if (school == null)
            {
                return NotFound(nameof(schoolId));
            }

            Console.Write(school.ReportedArticles.Count);

            var reportedArticles = school.ReportedArticles;

            var reportedArticleDtos = new List<ArticleWithReportsDto>();

            foreach (var article in reportedArticles)
            {
                var reportedArticleDto = _mapper.Map<ArticleWithReportsDto>(article);

                reportedArticleDtos.Add(reportedArticleDto);
            }

            return Ok(reportedArticleDtos);
        }

        [HttpPost("/report_article")]
        public async Task<ActionResult> ReportArticle(
            ReportForCreateDto reportForCreateDto)
        {
            var article = await _unitOfWork.ArticleRepository
                .GetByIdAsync(reportForCreateDto.ArticleId);

            if (article == null)
            {
                return NotFound(nameof(reportForCreateDto.ArticleId));
            }

            var report = _mapper.Map<Report>(reportForCreateDto);

            article.Reports.Add(report);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("moderate/{reportId}/by_user/{userId}")]
        public async Task<ActionResult> DeleteReport(
            Guid userId, Guid reportId, [FromBody] bool isReportTrue = false)
        {

            var report = await _unitOfWork.ReportRepository
                .GetReport(reportId);

            if (report == null)
            {
                return NotFound(nameof(reportId));
            }

            var article = await _unitOfWork.ArticleRepository
                .GetByIdAsync(report.ArticleId);

            if (article == null)
            {
                return NotFound(nameof(article));
            }

            var school = article.School;

            var isUserAdmin = await _unitOfWork.UserRepository
                .IsAdminAsync(userId, school.Id);

            if (!isUserAdmin)
            {
                return Unauthorized(nameof(isUserAdmin));
            }

            await _unitOfWork.ReportRepository
                .DeleteReport(report, isReportTrue);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
