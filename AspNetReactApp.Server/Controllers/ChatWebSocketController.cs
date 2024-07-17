// using Microsoft.AspNetCore.Mvc;
// using System.Net.WebSockets;

// [ApiController]
// public class ChatWebSocketController : ControllerBase
// {
//   private readonly ChatManager _chatManager;

//   public ChatWebSocketController(ChatManager chatManager)
//   {
//     _chatManager = chatManager;
//   }

//   [HttpGet("/chat")]
//   public async Task Get()
//   {
//     // if (HttpContext.WebSockets.IsWebSocketRequest)
//     // {
//     //   WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
//     //   await _chatManager.HandleWebSocketConnectionAsync(webSocket);
//     // }
//     // else
//     // {
//     //   HttpContext.Response.StatusCode = 400;
//     // }
//     Console.WriteLine($"Received request on {HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}");
//     if (HttpContext.WebSockets.IsWebSocketRequest)
//     {
//       Console.WriteLine("WebSocket connection request received");
//       WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
//       Console.WriteLine("WebSocket connection accepted");
//       await _chatManager.HandleWebSocketConnectionAsync(webSocket);
//     }
//     else
//     {
//       Console.WriteLine("Non-WebSocket request received");
//       HttpContext.Response.StatusCode = 400;
//     }
//   }
// }


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

  [HttpGet("/chat")]
  public async Task Get(string displayName)
  {
    Console.WriteLine($"Received request on {HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}");
    if (HttpContext.WebSockets.IsWebSocketRequest)
    {
      Console.WriteLine("WebSocket connection request received");
      WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
      Console.WriteLine("WebSocket connection accepted");
      await _chatManager.HandleWebSocketConnectionAsync(webSocket, displayName);
    }
    else
    {
      Console.WriteLine("Non-WebSocket request received");
      HttpContext.Response.StatusCode = 400;
    }
  }
}
