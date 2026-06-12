using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExpenseTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Icon", "Name" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "#FF9500", "utensils", "Food & Dining" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "#5AC8FA", "car", "Transportation" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "#5856D6", "home", "Housing & Rent" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), "#FFCC00", "bolt", "Utilities" },
                    { new Guid("55555555-5555-5555-5555-555555555555"), "#4CD964", "film", "Entertainment" },
                    { new Guid("66666666-6666-6666-6666-666666666666"), "#FF2D55", "cart", "Shopping" },
                    { new Guid("77777777-7777-7777-7777-777777777777"), "#FF3B30", "medkit", "Healthcare" },
                    { new Guid("88888888-8888-8888-8888-888888888888"), "#007AFF", "wallet", "Salary & Income" },
                    { new Guid("99999999-9999-9999-9999-999999999999"), "#8E8E93", "ellipsis-horizontal", "Others" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"));
        }
    }
}
