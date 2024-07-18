import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Button from "./Button";
import Input from "./Input";

interface Message {
  senderName: string;
  senderId: string;
  content: string;
}

const ChatComponent: React.FC = () => {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [userReady, setUserReady] = useState<boolean>(false);
  const [userSocketId, setUserSocketId] = useState<string>("");
  const displayNameRef = useRef<HTMLInputElement>(null);
  const socketUrl = displayName
    ? `wss://samuelpchao.azurewebsites.net/api/webSocketChat?displayName=${displayName}`
    : null;
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("WebSocket connected");
      },
      onClose: () => {
        console.log("WebSocket disconnected");
      },
      onError: (error) => console.error("WebSocket error:", error),
    },
    userReady && socketUrl !== null
  );
  useEffect(() => {
    if (lastMessage !== null) {
      const messageObject = JSON.parse(lastMessage.data);
      if (messageObject.type === "connection") {
        setUserSocketId(messageObject.socketId);
      } else {
        setMessageHistory((prev) => [
          ...prev,
          {
            senderName: messageObject.senderName,
            content: JSON.parse(messageObject.message),
            senderId: messageObject.senderId,
          },
        ]);
      }
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => {
    const messageObject = inputMessage;
    sendMessage(JSON.stringify(messageObject));
    setMessageHistory((prev) => [
      ...prev,
      {
        senderName: displayName,
        senderId: userSocketId,
        content: inputMessage,
      },
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

  const handleSubmitDisplayName = () => {
    if (!displayNameRef.current!.value.trim()) {
      return alert("Display name cannot be empty");
    }
    setDisplayName(displayNameRef.current!.value);
    setUserReady(true);
  };

  return (
    <div>
      {!userReady && (
        <div className="w-full flex flex-wrap justify-center gap-x-[0.5rem]">
          <Input type="text" placeholder="請輸入名稱" ref={displayNameRef} />
          <Button type="button" onClick={handleSubmitDisplayName}>
            加入
          </Button>
        </div>
      )}

      {userReady && (
        <div>
          <p>Connection status: {connectionStatus}</p>
          <div className="w-full flex flex-wrap gap-y-2 h-fit max-h-screen border-1 border-solid border-white-3 rounded p-2">
            <div className="w-full h-[28rem] overflow-y-auto">
              {messageHistory.map((message, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-wrap mb-[0.5rem]"
                  style={{
                    justifyContent:
                      message.senderId === userSocketId ? "right" : "left",
                  }}
                >
                  <p className="w-[60%] p-2 border-1 border-solid border-white-3 rounded bg-gray-600">
                    <h3>{message.senderName}:</h3>
                    <span>{message.content}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-wrap justify-center gap-x-[0.5rem]">
              <Input
                style={{ flex: 1, display: "flex" }}
                type="text"
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputMessage(e.target.value)
                }
              />
              <Button
                type="button"
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
