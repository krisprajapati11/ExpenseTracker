using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BudgetsController : ControllerBase
{
    private readonly IBudgetService
        _budgetService;

    public BudgetsController(
        IBudgetService budgetService)
    {
        _budgetService =
            budgetService;
    }

    [HttpPost]
    public async Task<IActionResult>
    CreateBudget(
        CreateBudgetDto request)
    {
        var userId = Guid.Parse(
            User.FindFirst("id")!.Value
        );

        var result =
            await _budgetService
                .CreateBudgetAsync(
                    userId,
                    request
                );

        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult>
    GetBudgets()
    {
        var userId = Guid.Parse(
            User.FindFirst("id")!.Value
        );

        var result =
            await _budgetService
                .GetBudgetsAsync(
                    userId
                );

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult>
    DeleteBudget(Guid id)
    {
        var userId = Guid.Parse(
            User.FindFirst("id")!.Value
        );

        var result =
            await _budgetService
                .DeleteBudgetAsync(
                    id,
                    userId
                );

        if (!result)
        {
            return BadRequest();
        }

        return Ok();
    }
}