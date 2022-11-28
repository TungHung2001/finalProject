using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class Posts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    article = table.Column<string>(type: "TEXT", nullable: true),
                    article1 = table.Column<string>(type: "TEXT", nullable: true),
                    article2 = table.Column<string>(type: "TEXT", nullable: true),
                    article3 = table.Column<string>(type: "TEXT", nullable: true),
                    article4 = table.Column<string>(type: "TEXT", nullable: true),
                    image = table.Column<string>(type: "TEXT", nullable: true),
                    Image1 = table.Column<string>(type: "TEXT", nullable: true),
                    Image2 = table.Column<string>(type: "TEXT", nullable: true),
                    Image3 = table.Column<string>(type: "TEXT", nullable: true),
                    Image4 = table.Column<string>(type: "TEXT", nullable: true),
                    URL = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
