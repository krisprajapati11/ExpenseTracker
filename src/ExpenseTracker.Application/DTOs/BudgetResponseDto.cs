namespace ExpenseTracker.Application.DTOs;

public class BudgetResponseDto
{
    public Guid Id { get; set; }

    public decimal LimitAmount { get; set; }

    public decimal SpentAmount { get; set; }

    public decimal RemainingAmount { get; set; }

    public int Month { get; set; }

    public int Year { get; set; }
}