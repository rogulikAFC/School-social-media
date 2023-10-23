using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSocialMediaServer.Migrations
{
    /// <inheritdoc />
    public partial class ArticlePreviewImageAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PreviewImageFileName",
                table: "Articles",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviewImageFileName",
                table: "Articles");
        }
    }
}
