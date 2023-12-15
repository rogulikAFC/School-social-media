using Microsoft.EntityFrameworkCore;
using SchoolSocialMediaServer.Entities;

namespace SchoolSocialMediaServer.DbContexts
{
    public class SchoolSocialMediaDbContext : DbContext
    {
        public SchoolSocialMediaDbContext(DbContextOptions<SchoolSocialMediaDbContext> options)
            : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleView> ArticleViews { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<AdminStatus> AdminStatuses { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<FileArticle> FileArticles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Articles)
                .WithOne(c => c.Category)
                .OnDelete(DeleteBehavior.SetNull);

            base.OnModelCreating(modelBuilder);
        }
    }
}
