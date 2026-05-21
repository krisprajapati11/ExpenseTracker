using ExpenseTracker.Application.DTOs;

namespace ExpenseTracker.Application.Interfaces;

public interface ICategoryService
{
    Task<CategoryResponseDto> AddCategoryAsync(CreateCategoryDto request);

    Task<List<CategoryResponseDto>> GetCategoriesAsync();
}