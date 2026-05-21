using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Application.DTOs
{
    public class MonthlyExpenseDto
    {
        public string Month { get; set; } = string.Empty;
        public decimal Total { get; set; }
    }
}
