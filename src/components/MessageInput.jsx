import React from "react";
import { Send } from "lucide-react";

export default function MessageInput({ newMessage, setNewMessage, sendMessage }) {
  return (
    <form
      onSubmit={sendMessage}
      className="flex items-center p-4 bg-gray-900 border-t border-gray-700 backdrop-blur-md"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-3 bg-gray-800 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
      />
      <button
        type="submit"
        className="ml-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-4 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-blue-500/40 flex items-center gap-2"
      >
        <Send className="w-4 h-4" />
        Send
      </button>
    </form>
  );
}
