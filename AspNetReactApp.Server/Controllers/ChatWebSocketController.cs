using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;

[ApiController]
public class ChatWebSocketController : ControllerBase
{
  private readonly ChatManager _chatManager;

  public ChatWebSocketController(ChatManager chatManager)
  {
    _chatManager = chatManager;
  }

  [HttpGet("/api/webSocketChat")]
  public async Task Get(string displayName)
  {
    Console.WriteLine($"Received request on {HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}");
    if (HttpContext.WebSockets.IsWebSocketRequest)
    {
      Console.WriteLine("WebSocket connection request received");
      try
      {
        WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
        Console.WriteLine("WebSocket connection accepted");
        await _chatManager.HandleWebSocketConnectionAsync(webSocket, displayName);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error accepting WebSocket: {ex.Message}");
      }
    }
    else
    {
      Console.WriteLine("Non-WebSocket request received");
      HttpContext.Response.StatusCode = 400;
    }
  }
}
