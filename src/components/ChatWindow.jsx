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
      // Smoother dark background
      className="p-6 flex flex-col overflow-y-auto h-[500px] bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
    >
      {messages.map((msg, idx) => {
        const isMe = msg.user_name === userEmail;

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            key={idx}
            className={`my-2.5 flex w-full items-end ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {/* Other User Avatar */}
            {!isMe && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full mr-2 object-cover border-2 border-gray-700"
              />
            )}

            <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
              {/* Message Bubble - Rounded and soft color palette */}
              <div
                className={`p-3 rounded-2xl shadow-md transition-all duration-200 ${
                  isMe
                    // My messages: Muted, smoothing teal
                    ? "bg-teal-600 text-white rounded-br-lg"
                    // Other messages: Soft dark card color
                    : "bg-gray-700 text-gray-100 rounded-tl-lg"
                }`}
              >
                 {!isMe && (
                  <p className="text-xs font-semibold text-teal-300 mb-0.5">
                    {msg.user_name?.split('@')[0]}
                  </p>
                )}
                <p className="text-base break-words leading-snug">{msg.message}</p>
              </div>
              {/* Timestamp */}
              <span
                className={`text-xs text-gray-500 mt-1 ${
                  isMe ? "text-right mr-1" : "text-left ml-1"
                }`}
              >
                {formatTime(msg.timestamp)}
              </span>
            </div>

            {/* My Avatar */}
            {isMe && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full ml-2 object-cover border-2 border-teal-500"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}