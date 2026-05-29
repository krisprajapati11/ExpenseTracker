using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Application.DTOs;

public class UpdateBudgetDto
{
    public decimal LimitAmount { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
}