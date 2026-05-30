FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore ExpenseTracker.API.csproj

RUN dotnet publish ExpenseTracker.API.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "ExpenseTracker.API.dll"]
