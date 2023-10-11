﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSocialMediaServer.Migrations
{
    /// <inheritdoc />
    public partial class UserKarmaAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Karma",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Karma",
                table: "Users");
        }
    }
}
