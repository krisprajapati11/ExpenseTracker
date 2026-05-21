using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using ExpenseTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Infrastructure.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly AppDbContext _context;

    public AnalyticsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryAnalyticsDto>>
        GetCategoryAnalyticsAsync(Guid userId)
    {
        return await _context.Expenses
            .Where(x => x.UserId == userId)
            .GroupBy(x => x.Category.Name)
            .Select(g => new CategoryAnalyticsDto
            {
                Category = g.Key,
                Total = g.Sum(x => x.Amount)
            })
            .ToListAsync();
    }

    public async Task<List<MonthlyExpenseDto>>
        GetMonthlyAnalyticsAsync(Guid userId)
    {
        return await _context.Expenses
            .Where(x => x.UserId == userId)
            .GroupBy(x => x.Date.Month)
            .Select(g => new MonthlyExpenseDto
            {
                Month = g.Key.ToString(),
                Total = g.Sum(x => x.Amount)
            })
            .ToListAsync();
    }
}