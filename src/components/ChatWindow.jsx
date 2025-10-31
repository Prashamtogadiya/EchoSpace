import React from "react";
import { motion } from "framer-motion";

const formatTime = (timestamp) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatWindow({ messages, session, chatContainerRef }) {
  const userEmail = session?.user?.user_metadata?.email;

  return (
    <div
      ref={chatContainerRef}
      className="p-4 flex flex-col overflow-y-auto h-[500px] bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
    >
      {messages.map((msg, idx) => {
        const isMe = msg.user_name === userEmail;

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={idx}
            className={`my-3 flex w-full items-end ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {!isMe && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3 border border-gray-600 shadow-md"
              />
            )}

            <div className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
              <div
                className={`p-3 rounded-2xl shadow-lg backdrop-blur-md ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm break-words leading-relaxed">{msg.message}</p>
              </div>
              <span
                className={`text-xs text-gray-400 mt-1 ${
                  isMe ? "text-right" : "text-left"
                }`}
              >
                {formatTime(msg.timestamp)}
              </span>
            </div>

            {isMe && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full ml-3 border border-gray-600 shadow-md"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
