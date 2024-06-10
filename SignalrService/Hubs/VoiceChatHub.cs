using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

public class VoiceChatHub : Hub
{
    // Concurrent dictionary to store connected clients
    private static ConcurrentDictionary<string, string> connectedClients = new ConcurrentDictionary<string, string>();

    public override Task OnConnectedAsync()
    {
        string clientId = Context.ConnectionId;
        connectedClients.TryAdd(clientId, clientId);

        Console.WriteLine($"Client connected: {clientId}");
        Console.WriteLine("Current connected clients: " + string.Join(", ", connectedClients.Keys));

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        string clientId = Context.ConnectionId;
        connectedClients.TryRemove(clientId, out _);

        Console.WriteLine($"Client disconnected: {clientId}");
        Console.WriteLine("Current connected clients: " + string.Join(", ", connectedClients.Keys));

        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendAudio(string base64AudioData)
    {
        Console.WriteLine("Server received audio data", base64AudioData);
        Console.WriteLine("Connected clients: " + string.Join(", ", connectedClients.Keys));

        // Broadcast the audio data to all connected clients except the sender
        await Clients.Others.SendAsync("ReceiveAudio", base64AudioData);
    }

    public Task<string[]> GetConnectedClients()
    {
        return Task.FromResult(connectedClients.Keys.ToArray());
    }
}
