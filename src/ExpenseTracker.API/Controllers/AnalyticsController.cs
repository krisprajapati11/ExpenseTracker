using ExpenseTracker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExpenseTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _analyticsService;

    public AnalyticsController(
        IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategoryAnalytics()
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        var result = await _analyticsService
            .GetCategoryAnalyticsAsync(Guid.Parse(userId!));

        return Ok(result);
    }

    [HttpGet("monthly")]
    public async Task<IActionResult> GetMonthlyAnalytics()
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        var result = await _analyticsService
            .GetMonthlyAnalyticsAsync(Guid.Parse(userId!));

        return Ok(result);
    }
}