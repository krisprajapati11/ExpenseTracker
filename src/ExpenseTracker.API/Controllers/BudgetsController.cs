using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExpenseTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BudgetsController : ControllerBase
{
    private readonly IBudgetService _budgetService;

    public BudgetsController(IBudgetService budgetService)
    {
        _budgetService = budgetService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBudget(CreateBudgetDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var result = await _budgetService.CreateBudgetAsync(Guid.Parse(userId), request);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetBudgets()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var result = await _budgetService.GetBudgetsAsync(Guid.Parse(userId));
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBudget(Guid id, UpdateBudgetDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var updated = await _budgetService.UpdateBudgetAsync(id, Guid.Parse(userId), request);
        if (!updated) return NotFound("Budget not found");

        return Ok("Budget updated successfully");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBudget(Guid id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var result = await _budgetService.DeleteBudgetAsync(id, Guid.Parse(userId));
        if (!result) return NotFound("Budget not found");

        return Ok("Budget deleted successfully");
    }
}