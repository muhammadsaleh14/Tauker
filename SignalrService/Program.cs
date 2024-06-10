var builder = WebApplication.CreateBuilder(args);

// Add SignalR services to the dependency injection container
builder.Services.AddSignalR();

// Allow cross-origin requests (CORS)
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(_ => true)
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("CorsPolicy");

app.MapHub<VoiceChatHub>("/voiceChatHub");

app.MapGet("/", () => "Hello World!");

app.Run();
