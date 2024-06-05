
using BlazorApp;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;
using GrpcService.SharedProtos;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

////Add gRPC service
builder.Services.AddSingleton(services =>
{
    // Get the service address from appsettings.json
    var config = services.GetRequiredService<IConfiguration>();
    var backendUrl = "https://localhost:7035";

    // Create a channel with a GrpcWebHandler that is addressed to the backend server.
    //
    // GrpcWebText is used because server streaming requires it. If server streaming is not used in your app
    // then GrpcWeb is recommended because it produces smaller messages.
    var httpHandler = new GrpcWebHandler(GrpcWebMode.GrpcWebText, new HttpClientHandler());

    return GrpcChannel.ForAddress(backendUrl, new GrpcChannelOptions { HttpHandler = httpHandler });
});

builder.Services.AddSingleton<Audio.AudioClient>(services =>
{
    var channel = services.GetRequiredService<GrpcChannel>();
    return new Audio.AudioClient(channel);
});



//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        builder =>
//        {
//            builder.AllowAnyOrigin()
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//        });
//});


//builder.Services.AddGrpcClient<GrpcService.SharedProtos.Audio.AudioClient>(options =>
//{
//    options.Address = new Uri("");
//});


await builder.Build().RunAsync();
