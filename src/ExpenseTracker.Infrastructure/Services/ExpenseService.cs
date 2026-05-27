using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using ExpenseTracker.Domain.Entities;
using ExpenseTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Infrastructure.Services;

public class ExpenseService : IExpenseService
{
    private readonly AppDbContext _context;

    public ExpenseService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ExpenseResponseDto> AddExpenseAsync(
        Guid userId,
        CreateExpenseDto request)
    {
        var expense = new Expense
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            CategoryId = request.CategoryId,
            Amount = request.Amount,
            Description = request.Description,
            Date = request.Date
        };

        _context.Expenses.Add(expense);

        await _context.SaveChangesAsync();

        return new ExpenseResponseDto
        {
            Id = expense.Id,
            CategoryId = expense.CategoryId,
            Amount = expense.Amount,
            Description = expense.Description,
            Date = expense.Date
        };
    }

    public async Task<List<ExpenseResponseDto>> GetExpensesAsync(Guid userId)
    {
        return await _context.Expenses
             .Include(x => x.Category)
            .Where(x => x.UserId == userId)
            .Select(x => new ExpenseResponseDto
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                CategoryName = x.Category.Name,
                Amount = x.Amount,
                Description = x.Description,
                Date = x.Date
            })
            .ToListAsync();
    }

    public async Task<bool> DeleteExpenseAsync(Guid expenseId, Guid userId)
    {
        var expense = await _context.Expenses
            .FirstOrDefaultAsync(x =>
                x.Id == expenseId &&
                x.UserId == userId);

        if (expense == null)
        {
            return false;
        }

        _context.Expenses.Remove(expense);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateExpenseAsync(
    Guid expenseId,
    Guid userId,
    UpdateExpenseDto request)
    {
        var expense = await _context.Expenses
            .FirstOrDefaultAsync(x =>
                x.Id == expenseId &&
                x.UserId == userId);

        if (expense == null)
        {
            return false;
        }

        expense.CategoryId = request.CategoryId;
        expense.Amount = request.Amount;
        expense.Description = request.Description;
        expense.Date = request.Date;

        await _context.SaveChangesAsync();

        return true;
    }
}