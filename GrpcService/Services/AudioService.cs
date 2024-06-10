using Grpc.Core;
using GrpcService.SharedProtos;
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading.Tasks;

namespace GrpcService.Services
{
    public class AudioService : Audio.AudioBase
    {
        private static readonly ConcurrentDictionary<string, IServerStreamWriter<AudioChunk>> Clients =
            new ConcurrentDictionary<string, IServerStreamWriter<AudioChunk>>();

        public override async Task StreamAudio(
            IAsyncStreamReader<AudioChunk> requestStream,
            IServerStreamWriter<AudioChunk> responseStream,
            ServerCallContext context)
        {
            var clientId = context.Peer;
            Clients[clientId] = responseStream;

            try
            {
                await foreach (var chunk in requestStream.ReadAllAsync())
                {
                    Debug.Write("writing to clients" + Clients);
                    Console.WriteLine("writing to clients" + Clients);
                    foreach (var client in Clients)
                    {
                        await client.Value.WriteAsync(chunk);
                    }
                }
            }
            finally
            {
                // Clients.TryRemove(clientId, out _);
            }
        }
    }
}
