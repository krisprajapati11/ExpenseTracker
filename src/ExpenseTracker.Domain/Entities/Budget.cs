using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Domain.Entities
{
    public class Budget
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public decimal LimitAmount { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        // Navigation Properties
        public User User { get; set; } = null!;

    }
}
