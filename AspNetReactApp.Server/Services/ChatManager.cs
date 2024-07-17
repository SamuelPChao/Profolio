using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

// public class ChatManager
// {
//   private readonly ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

//   public async Task HandleWebSocketConnectionAsync(WebSocket webSocket)
//   {
//     var socketId = Guid.NewGuid().ToString();
//     _sockets.TryAdd(socketId, webSocket);

//     var buffer = new byte[1024 * 4];
//     WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

//     while (!result.CloseStatus.HasValue)
//     {
//       string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
//       await BroadcastMessage(socketId, message);

//       result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
//     }

//     await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
//     _sockets.TryRemove(socketId, out _);
//   }

//   private async Task BroadcastMessage(string senderId, string message)
//   {
//     // foreach (var socket in _sockets)
//     // {
//     //   if (socket.Key != senderId)
//     //   {
//     //     var bytes = Encoding.UTF8.GetBytes(message);
//     //     await socket.Value.SendAsync(new ArraySegment<byte>(bytes, 0, bytes.Length), WebSocketMessageType.Text, true, CancellationToken.None);
//     //   }
//     // }
//     var messageObject = new { senderId, message };
//     var messageJson = JsonSerializer.Serialize(messageObject);
//     var bytes = Encoding.UTF8.GetBytes(messageJson);

//     foreach (var socket in _sockets)
//     {
//       if (socket.Key != senderId)
//       {
//         await socket.Value.SendAsync(new ArraySegment<byte>(bytes, 0, bytes.Length), WebSocketMessageType.Text, true, CancellationToken.None);
//       }
//     }
//   }
// }


public class ChatManager
{
  private readonly ConcurrentDictionary<string, (WebSocket socket, string displayName)> _sockets = new ConcurrentDictionary<string, (WebSocket, string)>();

  public async Task HandleWebSocketConnectionAsync(WebSocket webSocket, string displayName)
  {
    var socketId = Guid.NewGuid().ToString();
    _sockets.TryAdd(socketId, (webSocket, displayName));

    var buffer = new byte[1024 * 4];
    WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

    while (!result.CloseStatus.HasValue)
    {
      string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
      await BroadcastMessage(socketId, message);

      result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
    }

    await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    _sockets.TryRemove(socketId, out _);
  }

  private async Task BroadcastMessage(string senderId, string message)
  {
    var senderName = _sockets[senderId].displayName;
    var messageObject = new { senderId, senderName, message };
    var messageJson = JsonSerializer.Serialize(messageObject);
    var bytes = Encoding.UTF8.GetBytes(messageJson);

    foreach (var socket in _sockets)
    {
      if (socket.Key != senderId)
      {
        await socket.Value.socket.SendAsync(new ArraySegment<byte>(bytes, 0, bytes.Length), WebSocketMessageType.Text, true, CancellationToken.None);
      }
    }
  }
  // private readonly ConcurrentDictionary<string, (WebSocket socket, string displayName)> _sockets = new ConcurrentDictionary<string, (WebSocket, string)>();

  // public async Task HandleWebSocketConnectionAsync(WebSocket webSocket, string displayName)
  // {
  //   var socketId = Guid.NewGuid().ToString();
  //   _sockets.TryAdd(socketId, (webSocket, displayName));

  //   var buffer = new byte[1024 * 4];
  //   WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

  //   while (!result.CloseStatus.HasValue)
  //   {
  //     string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
  //     await BroadcastMessage(socketId, message);

  //     result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
  //   }

  //   await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
  //   _sockets.TryRemove(socketId, out _);
  // }

  // private async Task BroadcastMessage(string senderId, string message)
  // {
  //   var senderName = _sockets[senderId].displayName;
  //   var messageObject = new { senderId, senderName, message };
  //   var messageJson = JsonSerializer.Serialize(messageObject);
  //   var bytes = Encoding.UTF8.GetBytes(messageJson);

  //   foreach (var socket in _sockets)
  //   {
  //     if (socket.Key != senderId)
  //     {
  //       await socket.Value.socket.SendAsync(new ArraySegment<byte>(bytes, 0, bytes.Length), WebSocketMessageType.Text, true, CancellationToken.None);
  //     }
  //   }
  // }
}
