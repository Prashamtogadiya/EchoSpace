import React, { useState } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ newMessage, setNewMessage, sendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form
      onSubmit={sendMessage}
      className="flex items-center p-5 bg-gradient-to-r from-slate-800 to-purple-900/30 border-t border-purple-500/30 backdrop-blur-sm"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-4 pr-12 bg-slate-700/50 text-white rounded-2xl border border-purple-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-base shadow-inner backdrop-blur-sm"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
        >
          <Smile className="w-5 h-5" />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-14 right-0 z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!newMessage.trim()}
        className={`ml-4 transition-all duration-300 px-6 py-4 rounded-2xl text-white font-semibold flex items-center gap-2.5 text-base shadow-lg transform hover:scale-105 ${
          newMessage.trim()
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-purple-500/50"
            : "bg-slate-600 cursor-not-allowed opacity-50"
        }`}
      >
        <Send className={`w-5 h-5 transition-transform duration-300 ${newMessage.trim() ? "group-hover:translate-x-1" : ""}`} />
        Send
      </button>
    </form>
  );
}
