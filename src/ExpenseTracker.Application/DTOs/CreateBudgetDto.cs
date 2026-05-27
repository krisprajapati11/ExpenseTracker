namespace ExpenseTracker.Application.DTOs;

public class CreateBudgetDto
{
    
    public decimal LimitAmount { get; set; }

    public int Month { get; set; }

    public int Year { get; set; }
}