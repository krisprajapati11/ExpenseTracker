using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExpenseTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ExpensesController : ControllerBase
{
    private readonly IExpenseService _expenseService;

    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpPost]
    public async Task<IActionResult> AddExpense(CreateExpenseDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var result = await _expenseService.AddExpenseAsync(
            Guid.Parse(userId),
            request);

        return Ok(result);
    }

    [HttpGet]

    public async Task<IActionResult> GetExpenses()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var result = await _expenseService.GetExpensesAsync(Guid.Parse(userId));
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpense(Guid id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var deleted = await _expenseService.DeleteExpenseAsync(
            id,
            Guid.Parse(userId));

        if (!deleted)
        {
            return NotFound("Expense not found");
        }

        return Ok("Expense deleted successfully");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExpense(
    Guid id,
    UpdateExpenseDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var updated = await _expenseService.UpdateExpenseAsync(
            id,
            Guid.Parse(userId),
            request);

        if (!updated)
        {
            return NotFound("Expense not found");
        }

        return Ok("Expense updated successfully");
    }









}