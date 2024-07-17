// import React, { useState, useCallback, useEffect } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";

// interface Message {
//   sender: string;
//   content: string;
// }

// const ChatComponent: React.FC = () => {
//   const [messageHistory, setMessageHistory] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState<string>("");
//   const { sendMessage, lastMessage, readyState } = useWebSocket(
//     "wss://localhost:7116/chat",
//     {
//       onOpen: () => console.log("WebSocket connected"),
//       onClose: () => console.log("WebSocket disconnected"),
//       onError: (error) => console.error("WebSocket error:", error),
//     }
//   );
//   useEffect(() => {
//     // if (lastMessage !== null) {
//     //   setMessageHistory((prev) => [
//     //     ...prev,
//     //     { sender: "Other", content: lastMessage.data },
//     //   ]);
//     // }
//     if (lastMessage !== null) {
//       const messageObject = JSON.parse(lastMessage.data);
//       setMessageHistory((prev) => [
//         ...prev,
//         { sender: messageObject.senderId, content: messageObject.message },
//       ]);
//     }
//   }, [lastMessage]);

//   const handleClickSendMessage = useCallback(() => {
//     sendMessage(inputMessage);
//     setMessageHistory((prev) => [
//       ...prev,
//       { sender: "You", content: inputMessage },
//     ]);
//     setInputMessage("");
//   }, [sendMessage, inputMessage]);

//   const connectionStatus = {
//     [ReadyState.CONNECTING]: "Connecting",
//     [ReadyState.OPEN]: "Open",
//     [ReadyState.CLOSING]: "Closing",
//     [ReadyState.CLOSED]: "Closed",
//     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
//   }[readyState];

//   return (
//     <div>
//       <p>Connection status: {connectionStatus}</p>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setInputMessage(e.target.value)
//         }
//       />
//       <button
//         className="cursor-pointer disabled:opacity-50"
//         onClick={handleClickSendMessage}
//         disabled={readyState !== ReadyState.OPEN}
//       >
//         Send
//       </button>
//       <ul>
//         {messageHistory.map((message, idx) => (
//           <li key={idx}>
//             <strong>{message.sender}:</strong> {message.content}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatComponent;

import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Message {
  sender: string;
  content: string;
}

const ChatComponent: React.FC = () => {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `wss://samuelpchao.azurewebsites.net/api/chat?displayName=${displayName}`,
    {
      onOpen: () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      },
      onClose: () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      },
      onError: (error) => console.error("WebSocket error:", error),
    },
    isConnected
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const messageObject = JSON.parse(lastMessage.data);
      console.log(lastMessage.data);
      setMessageHistory((prev) => [
        ...prev,
        {
          sender: messageObject.senderName,
          content: JSON.parse(messageObject.message),
        },
      ]);
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => {
    const messageObject = inputMessage;
    sendMessage(JSON.stringify(messageObject));
    setMessageHistory((prev) => [
      ...prev,
      { sender: displayName, content: inputMessage },
    ]);
    setInputMessage("");
  }, [sendMessage, inputMessage, displayName]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  if (!isConnected) {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter your display name"
          value={displayName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDisplayName(e.target.value)
          }
        />
        <button onClick={() => setIsConnected(true)} disabled={!displayName}>
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Connection status: {connectionStatus}</p>
      <input
        type="text"
        value={inputMessage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputMessage(e.target.value)
        }
      />
      <button
        className="cursor-pointer disabled:opacity-50"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Send
      </button>
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>
            <strong>{message.sender}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
