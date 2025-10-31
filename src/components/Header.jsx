import React from "react";
import { LogOut, Users } from "lucide-react";

export default function Header({ session, usersOnline, onSignOut }) {
  return (
    <header className="flex justify-between items-center h-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-lg">
      <div>
        <p className="text-gray-200 font-semibold text-lg">
          👋 {session?.user?.user_metadata?.full_name || "Guest"}
        </p>
        <div className="flex items-center text-gray-400 text-sm mt-1">
          <Users className="w-4 h-4 mr-1 text-green-400" />
          {usersOnline.length} user{usersOnline.length !== 1 ? "s" : ""} online
        </div>
      </div>

      <button
        onClick={onSignOut}
        className="flex items-center bg-red-600 hover:bg-red-700 transition-all duration-300 px-4 py-2 rounded-xl text-white font-medium shadow-md hover:shadow-red-500/40"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign out
      </button>
    </header>
  );
}
