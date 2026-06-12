using ExpenseTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Expense> Expenses => Set<Expense>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Budget> Budgets => Set<Budget>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(user => user.CreatedAt)
                .HasColumnType("timestamp without time zone");

            entity.Property(user => user.RefreshTokenExpiryTime)
                .HasColumnType("timestamp without time zone");
        });

        modelBuilder.Entity<Expense>(entity =>
        {
            entity.Property(expense => expense.Amount)
                .HasPrecision(18, 2);

            entity.Property(expense => expense.Date)
                .HasColumnType("timestamp without time zone");

            entity.Property(expense => expense.CreatedAt)
                .HasColumnType("timestamp without time zone");
        });

        modelBuilder.Entity<Budget>(entity =>
        {
            entity.Property(budget => budget.LimitAmount)
                .HasPrecision(18, 2);
        });

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), Name = "Food & Dining", Icon = "utensils", Color = "#FF9500" },
            new Category { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), Name = "Transportation", Icon = "car", Color = "#5AC8FA" },
            new Category { Id = Guid.Parse("33333333-3333-3333-3333-333333333333"), Name = "Housing & Rent", Icon = "home", Color = "#5856D6" },
            new Category { Id = Guid.Parse("44444444-4444-4444-4444-444444444444"), Name = "Utilities", Icon = "bolt", Color = "#FFCC00" },
            new Category { Id = Guid.Parse("55555555-5555-5555-5555-555555555555"), Name = "Entertainment", Icon = "film", Color = "#4CD964" },
            new Category { Id = Guid.Parse("66666666-6666-6666-6666-666666666666"), Name = "Shopping", Icon = "cart", Color = "#FF2D55" },
            new Category { Id = Guid.Parse("77777777-7777-7777-7777-777777777777"), Name = "Healthcare", Icon = "medkit", Color = "#FF3B30" },
            new Category { Id = Guid.Parse("88888888-8888-8888-8888-888888888888"), Name = "Salary & Income", Icon = "wallet", Color = "#007AFF" },
            new Category { Id = Guid.Parse("99999999-9999-9999-9999-999999999999"), Name = "Others", Icon = "ellipsis-horizontal", Color = "#8E8E93" }
        );
    }
}
