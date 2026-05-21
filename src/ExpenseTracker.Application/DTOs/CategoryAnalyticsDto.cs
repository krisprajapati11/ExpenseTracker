using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Application.DTOs
{
    public class CategoryAnalyticsDto
    {
        public string Category { get; set; } = string.Empty;

        public decimal Total { get; set; }

    }
}
