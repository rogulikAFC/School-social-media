﻿using SchoolSocialMediaServer.UnitOfWork;

namespace SchoolSocialMediaServer.Repositories
{
    public interface IUnitOfWork
    {
        ISchoolRepository SchoolRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IArticleRepository ArticleRepository { get; }
        IUserRepository UserRepository { get; }
        IReportRepository ReportRepository { get; }
        IFileArticleRepository FileArticleRepository { get; }
        Task<bool> SaveChangesAsync();
    }
}
