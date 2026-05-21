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

    public async Task<BudgetResponseDto> CreateBudgetAsync(
        Guid userId,
        CreateBudgetDto request)
    {
        var budget = new Budget
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            CategoryId = request.CategoryId,
            LimitAmount = request.LimitAmount,
            Month = request.Month,
            Year = request.Year
        };

        _context.Budgets.Add(budget);

        await _context.SaveChangesAsync();

        return new BudgetResponseDto
        {
            Id = budget.Id,
            CategoryId = budget.CategoryId,
            LimitAmount = budget.LimitAmount,
            Month = budget.Month,
            Year = budget.Year
        };
    }

    public async Task<List<BudgetResponseDto>>
        GetBudgetsAsync(Guid userId)
    {
        return await _context.Budgets
            .Where(x => x.UserId == userId)
            .Select(x => new BudgetResponseDto
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                LimitAmount = x.LimitAmount,
                Month = x.Month,
                Year = x.Year
            })
            .ToListAsync();
    }
}