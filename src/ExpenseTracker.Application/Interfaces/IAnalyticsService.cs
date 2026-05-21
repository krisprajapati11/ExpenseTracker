using ExpenseTracker.Application.DTOs;

namespace ExpenseTracker.Application.Interfaces;

public interface IAnalyticsService
{
    Task<List<CategoryAnalyticsDto>> GetCategoryAnalyticsAsync(Guid userId);

    Task<List<MonthlyExpenseDto>> GetMonthlyAnalyticsAsync(Guid userId);
}