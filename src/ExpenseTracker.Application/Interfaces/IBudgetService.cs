using ExpenseTracker.Application.DTOs;

namespace ExpenseTracker.Application.Interfaces;

public interface IBudgetService
{
    Task<BudgetResponseDto> CreateBudgetAsync(Guid userId, CreateBudgetDto request);
    Task<List<BudgetResponseDto>> GetBudgetsAsync(Guid userId);
    Task<bool> UpdateBudgetAsync(Guid budgetId, Guid userId, UpdateBudgetDto request);
    Task<bool> DeleteBudgetAsync(Guid budgetId, Guid userId);
}