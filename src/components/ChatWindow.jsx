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
      className="p-6 flex flex-col overflow-y-auto h-[500px] bg-gradient-to-b from-slate-900/50 to-slate-800/50 backdrop-blur-sm scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent"
    >
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              No messages yet. Start the conversation!
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => {
        const isMe = msg.user_name === userEmail;

        return (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            key={idx}
            className={`my-3 flex w-full items-end ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {/* Other User Avatar */}
            {!isMe && (
              <div className="relative">
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-purple-500/50 shadow-lg"
                />
                <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
              </div>
            )}

            <div
              className={`flex flex-col max-w-[70%] ${
                isMe ? "items-end" : "items-start"
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`group relative p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isMe
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-md"
                    : "bg-gradient-to-br from-slate-700 to-slate-600 text-gray-100 rounded-tl-md"
                }`}
              >
                {!isMe && (
                  <p className="text-xs font-bold text-purple-300 mb-1.5">
                    {msg.user_name?.split("@")[0]}
                  </p>
                )}
                <p className="text-base break-words leading-relaxed">
                  {msg.message}
                </p>

                {/* Decorative corner accent */}
                <div
                  className={`absolute ${
                    isMe ? "bottom-0 right-0" : "bottom-0 left-0"
                  } w-2 h-2 ${
                    isMe ? "bg-purple-400" : "bg-slate-500"
                  } opacity-50`}
                ></div>
              </div>

              {/* Timestamp */}
              <span
                className={`text-xs text-gray-500 mt-1.5 font-medium ${
                  isMe ? "text-right mr-1" : "text-left ml-1"
                }`}
              >
                {formatTime(msg.timestamp)}
              </span>
            </div>

            {/* My Avatar */}
            {isMe && (
              <div className="relative">
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full ml-3 object-cover border-2 border-blue-500/50 shadow-lg"
                />
                <div className="absolute bottom-0 left-2 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}