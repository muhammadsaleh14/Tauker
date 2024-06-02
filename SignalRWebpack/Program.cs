using Microsoft.AspNetCore.ResponseCompression;
using SignalRBackend.Hubs;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
          new[] { "application/octet-stream" });
});

var app = builder.Build();

app.UseResponseCompression();

app.MapHub<ChatHub>("/chathub");

app.MapGet("/", () => "Hello World!");

app.Run();
