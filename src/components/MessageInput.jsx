import React from "react";

export default function MessageInput({ newMessage, setNewMessage, sendMessage }) {
  return (
    <form
      onSubmit={sendMessage}
      className="flex flex-col sm:flex-row p-4 border-t border-gray-700"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="p-2 w-full bg-[#00000040] rounded-lg focus:outline-none"
      />
      <button
        type="submit"
        className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
      <span />
    </form>
  );
}
