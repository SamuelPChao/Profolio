import React, { useState, useCallback, useEffect, useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ChatComponent from "../components/ChatComponent";
interface Message {
  senderName: string;
  senderId: string;
  content: string;
}

const ChatPage: React.FC = () => {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [userReady, setUserReady] = useState<boolean>(false);
  const [userSocketId, setUserSocketId] = useState<string>("");
  const displayNameRef = useRef<HTMLInputElement>(null);
  const socketUrl = `wss://samuelpchao.azurewebsites.net/api/webSocketChat?displayName=${displayName}`;
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
    userReady
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
  }, [sendMessage, inputMessage, displayName, userSocketId]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "連線中",
    [ReadyState.OPEN]: "已連線",
    [ReadyState.CLOSING]: "關閉中",
    [ReadyState.CLOSED]: "已關閉",
    [ReadyState.UNINSTANTIATED]: "未初始化",
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
          <p className="text-center">連線狀態: {connectionStatus}</p>
          {readyState === ReadyState.OPEN && (
            <div className="w-full flex flex-wrap gap-y-2 h-fit border-1 border-solid border-white-3 rounded p-2">
              <ChatComponent
                messageList={messageHistory}
                title="senderName"
                content="content"
                identifier="senderId"
                ownIdentifier={userSocketId}
              />
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
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
