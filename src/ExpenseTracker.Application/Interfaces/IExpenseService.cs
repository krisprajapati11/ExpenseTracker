using System;
using System.Collections.Generic;
using System.Text;

using ExpenseTracker.Application.DTOs;

namespace ExpenseTracker.Application.Interfaces;

public interface IExpenseService
{
    Task<ExpenseResponseDto> AddExpenseAsync(
        Guid userId,
        CreateExpenseDto request);

    Task<List<ExpenseResponseDto>> GetExpensesAsync(Guid userId);
    Task<bool> DeleteExpenseAsync(Guid expenseId, Guid userId);

    Task<bool> UpdateExpenseAsync(
    Guid expenseId,
    Guid userId,
    UpdateExpenseDto request);
}