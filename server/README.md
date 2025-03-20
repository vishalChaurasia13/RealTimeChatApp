Backend + Database

To execute the server
cd RealTimeChatApp/server

install these dependencies

dotnet add package Swashbuckle.AspNetCore
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.SignalR

DATABASE

To create table in database and update run commands:
dotnet ef migrations add InitialCreate
dotnet ef database update
To run type this command:
dotnet run
