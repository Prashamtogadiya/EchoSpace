import React from "react";
import { LogOut, Users } from "lucide-react";

export default function Header({ session, usersOnline, onSignOut }) {
  return (
    <header className="flex justify-between items-center h-20 px-6 bg-gray-800 border-b border-gray-700/60 shadow-lg">
      <div className="flex items-center">
        {/* User Profile Info */}
        <div className="text-left">
          <p className="text-white font-medium text-xl">
            Hello, **{session?.user?.user_metadata?.full_name || "Guest"}**
          </p>
          <div className="flex items-center text-gray-400 text-sm mt-1">
            <Users className="w-4 h-4 mr-1 text-teal-400" />
            <span className="font-light">
              {usersOnline.length} active user{usersOnline.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Sign Out Button - Smooth red with a slight shadow */}
      <button
        onClick={onSignOut}
        className="flex items-center bg-red-600 hover:bg-red-500 transition-colors duration-200 px-5 py-2.5 rounded-xl text-white font-medium text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </button>
    </header>
  );
}