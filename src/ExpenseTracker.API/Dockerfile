FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Pehle sirf .csproj copy karo (relative path from project root)
COPY ["src/ExpenseTracker.API/ExpenseTracker.API.csproj", "src/ExpenseTracker.API/"]

# Agar aur projects hain (Domain, Infrastructure, etc.) toh unhe bhi add karo:
COPY ["src/ExpenseTracker.Domain/ExpenseTracker.Domain.csproj", "src/ExpenseTracker.Domain/"]
COPY ["src/ExpenseTracker.Infrastructure/ExpenseTracker.Infrastructure.csproj", "src/ExpenseTracker.Infrastructure/"]
COPY ["src/ExpenseTracker.Application/ExpenseTracker.Application.csproj", "src/ExpenseTracker.Application/"]

RUN dotnet restore "src/ExpenseTracker.API/ExpenseTracker.API.csproj"

# Baaki sab source copy karo
COPY . .

WORKDIR "/src/src/ExpenseTracker.API"
RUN dotnet publish "ExpenseTracker.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ExpenseTracker.API.dll"]
