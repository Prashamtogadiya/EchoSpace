import React from "react";

const formatTime = (timestamp) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatWindow({ messages, session, chatContainerRef }) {
  return (
    <div
      ref={chatContainerRef}
      className="p-4 flex flex-col overflow-y-auto h-[500px]"
    >
      {messages.map((msg, idx) => (
        <div
          className={`my-2 flex w-full items-start ${
            msg.user_name === session?.user?.user_metadata?.email
              ? "justify-end"
              : "justify-start"
          }`}
          key={idx}
        >
          {msg.user_name !== session?.user?.user_metadata?.email && (
            <img
              src={msg.avatar}
              alt=""
              className="w-10 h-10 rounded-full mr-2"
            />
          )}

          <div className="flex flex-col w-full">
            <div
              className={`p-2 max-w-[70%] rounded-xl ${
                msg.user_name === session?.user?.user_metadata?.email
                  ? "bg-gray-700 text-white ml-auto"
                  : "bg-gray-500 text-white mr-auto"
              }`}
            >
              <p>{msg.message}</p>
            </div>
            <div
              className={`text-xs opacity-75 pt-1 ${
                msg.user_name === session?.user?.user_metadata?.email
                  ? "text-right mr-2"
                  : "text-left ml-2"
              }`}
            >
              {formatTime(msg.timestamp)}
            </div>
          </div>

          {msg.user_name === session?.user?.user_metadata?.email && (
            <img
              src={msg.avatar}
              alt=""
              className="w-10 h-10 rounded-full ml-2"
            />
          )}
        </div>
      ))}
    </div>
  );
}
