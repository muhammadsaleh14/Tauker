using GrpcService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc(options =>
{
    options.EnableDetailedErrors = true;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policyBuilder =>
        {
            policyBuilder.AllowAnyOrigin()
                         .AllowAnyHeader()
                         .AllowAnyMethod();
        });
});

var app = builder.Build();

// Enable CORS globally
app.UseCors("AllowAll");

// Enable gRPC-Web
app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });

// Map gRPC service and enable gRPC-Web
app.MapGrpcService<AudioService>().EnableGrpcWeb().RequireCors("AllowAll");

// Map a default route
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
