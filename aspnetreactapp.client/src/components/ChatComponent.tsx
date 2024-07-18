import React from "react";

interface ChatComponentProps<T> {
  messageList: T[];
  title: keyof T;
  content: keyof T;
  identifier: keyof T;
  ownIdentifier: string;
}

const ChatComponent = <T,>({
  messageList,
  title,
  content,
  identifier,
  ownIdentifier,
}: ChatComponentProps<T>) => {
  return (
    <div className="w-full h-[calc(100dvh-12rem)] overflow-y-auto">
      {messageList.map((message, idx) => (
        <div
          key={idx}
          className="w-full flex flex-wrap mb-[0.5rem]"
          style={{
            justifyContent:
              message[identifier] === ownIdentifier ? "right" : "left",
          }}
        >
          <div className="w-[60%] p-2 border-1 border-solid border-white-3 rounded bg-gray-600">
            <h3>{message[title] as React.ReactNode}:</h3>
            <span>{message[content] as React.ReactNode}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
