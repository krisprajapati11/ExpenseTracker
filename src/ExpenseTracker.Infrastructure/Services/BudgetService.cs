using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using ExpenseTracker.Domain.Entities;
using ExpenseTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Infrastructure.Services;

public class BudgetService : IBudgetService
{
    private readonly AppDbContext _context;

    public BudgetService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<BudgetResponseDto> CreateBudgetAsync(Guid userId, CreateBudgetDto request)
    {
        var budget = new Budget
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            LimitAmount = request.LimitAmount,
            Month = request.Month,
            Year = request.Year
        };

        _context.Budgets.Add(budget);
        await _context.SaveChangesAsync();

        return new BudgetResponseDto
        {
            Id = budget.Id,
            LimitAmount = budget.LimitAmount,
            SpentAmount = 0,
            RemainingAmount = budget.LimitAmount,
            Month = budget.Month,
            Year = budget.Year
        };
    }

    public async Task<List<BudgetResponseDto>> GetBudgetsAsync(Guid userId)
    {
        return await _context.Budgets
            .Where(x => x.UserId == userId)
            .Select(x => new BudgetResponseDto
            {
                Id = x.Id,
                LimitAmount = x.LimitAmount,
                SpentAmount = _context.Expenses
                    .Where(e => e.UserId == userId && e.Date.Month == x.Month && e.Date.Year == x.Year)
                    .Sum(e => (decimal?)e.Amount) ?? 0,
                RemainingAmount = x.LimitAmount -
                    (_context.Expenses
                        .Where(e => e.UserId == userId && e.Date.Month == x.Month && e.Date.Year == x.Year)
                        .Sum(e => (decimal?)e.Amount) ?? 0),
                Month = x.Month,
                Year = x.Year
            })
            .ToListAsync();
    }

    public async Task<bool> UpdateBudgetAsync(Guid budgetId, Guid userId, UpdateBudgetDto request)
    {
        var budget = await _context.Budgets
            .FirstOrDefaultAsync(x => x.Id == budgetId && x.UserId == userId);

        if (budget == null) return false;

        budget.LimitAmount = request.LimitAmount;
        budget.Month = request.Month;
        budget.Year = request.Year;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteBudgetAsync(Guid budgetId, Guid userId)
    {
        var budget = await _context.Budgets
            .FirstOrDefaultAsync(x => x.Id == budgetId && x.UserId == userId);

        if (budget == null) return false;

        _context.Budgets.Remove(budget);
        await _context.SaveChangesAsync();
        return true;
    }
}