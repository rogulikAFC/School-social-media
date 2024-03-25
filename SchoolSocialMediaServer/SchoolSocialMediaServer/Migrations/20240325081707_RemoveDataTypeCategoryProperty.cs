using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSocialMediaServer.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDataTypeCategoryProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataType",
                table: "Categories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DataType",
                table: "Categories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
            
        }
    }
}
