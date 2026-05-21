namespace ExpenseTracker.Application.DTOs;

public class BudgetResponseDto
{
    public Guid Id { get; set; }

    public Guid CategoryId { get; set; }

    public decimal LimitAmount { get; set; }

    public int Month { get; set; }

    public int Year { get; set; }
}