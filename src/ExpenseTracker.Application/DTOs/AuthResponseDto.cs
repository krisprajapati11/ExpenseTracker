using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseTracker.Application.DTOs;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string RefreshToken { get; set; } = string.Empty;
}
