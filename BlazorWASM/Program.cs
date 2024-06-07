using BlazorWASM;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;
using GrpcService.SharedProtos;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddLogging(builder =>
{
    builder.AddProvider(new BrowserConsoleLoggerProvider());
});

builder.Services.AddSingleton(services =>
{
    // Get the service address from appsettings.json
    var config = services.GetRequiredService<IConfiguration>();
    var backendUrl = "https://localhost:7035"; // Optionally, get from config

    // Create a channel with a GrpcWebHandler that is addressed to the backend server.
    //
    // GrpcWebText is used because server streaming requires it. If server streaming is not used in your app
    // then GrpcWeb is recommended because it produces smaller messages.
    var httpHandler = new GrpcWebHandler(GrpcWebMode.GrpcWebText, new HttpClientHandler());

    return GrpcChannel.ForAddress(backendUrl, new GrpcChannelOptions { HttpHandler = httpHandler });
});

builder.Services.AddSingleton<Audio.AudioClient>(services =>
{
    // Reuse the existing GrpcChannel instance from the service container
    var channel = services.GetRequiredService<GrpcChannel>();
    return new Audio.AudioClient(channel);
});

await builder.Build().RunAsync();
