using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using ExpenseTracker.Domain.Entities;
using ExpenseTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Infrastructure.Services;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CategoryResponseDto> AddCategoryAsync(
        CreateCategoryDto request)
    {
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Icon = request.Icon,
            Color = request.Color
        };

        _context.Categories.Add(category);

        await _context.SaveChangesAsync();

        return new CategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Icon = category.Icon,
            Color = category.Color
        };
    }

    public async Task<List<CategoryResponseDto>> GetCategoriesAsync()
    {
        return await _context.Categories
            .Select(x => new CategoryResponseDto
            {
                Id = x.Id,
                Name = x.Name,
                Icon = x.Icon,
                Color = x.Color
            })
            .ToListAsync();
    }
}