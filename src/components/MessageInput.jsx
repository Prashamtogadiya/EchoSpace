import React from "react";
import { Send } from "lucide-react";

export default function MessageInput({ newMessage, setNewMessage, sendMessage }) {
  return (
    <form
      onSubmit={sendMessage}
      className="flex items-center p-4 bg-gray-800 border-t border-gray-700/60"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 p-3.5 bg-gray-700 text-white rounded-full border border-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 text-base"
      />
      <button
        type="submit"
        disabled={!newMessage.trim()}
        // Smoothing teal accent button
        className={`ml-4 transition-all duration-200 px-5 py-3.5 rounded-full text-white font-semibold flex items-center gap-2 text-base shadow-md ${
          newMessage.trim()
            ? "bg-teal-600 hover:bg-teal-500"
            : "bg-gray-600 cursor-not-allowed opacity-80"
        }`}
      >
        <Send className="w-5 h-5" />
        Send
      </button>
    </form>
  );
}