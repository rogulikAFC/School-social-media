using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSocialMediaServer.Migrations
{
    /// <inheritdoc />
    public partial class FileArticleCategoryAndSchoolAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileArticles_Categories_CategoryId",
                table: "FileArticles");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "FileArticles",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SchoolId",
                table: "FileArticles",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_FileArticles_SchoolId",
                table: "FileArticles",
                column: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileArticles_Categories_CategoryId",
                table: "FileArticles",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FileArticles_Schools_SchoolId",
                table: "FileArticles",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileArticles_Categories_CategoryId",
                table: "FileArticles");

            migrationBuilder.DropForeignKey(
                name: "FK_FileArticles_Schools_SchoolId",
                table: "FileArticles");

            migrationBuilder.DropIndex(
                name: "IX_FileArticles_SchoolId",
                table: "FileArticles");

            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "FileArticles");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "FileArticles",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_FileArticles_Categories_CategoryId",
                table: "FileArticles",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
