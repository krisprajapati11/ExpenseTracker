using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Application.DTOs;

public class UpdateExpenseDto
{
    public Guid CategoryId { get; set; }

    public decimal Amount { get; set; }

    public string Description { get; set; } = string.Empty;

    public DateTime Date { get; set; }
}
