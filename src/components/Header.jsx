import React from "react";
import { LogOut, Users } from "lucide-react";

export default function Header({ session, usersOnline, onSignOut }) {
  return (
    <header className="flex justify-between items-center h-20 px-6 bg-gradient-to-r from-slate-800 to-purple-900/50 border-b border-purple-500/30 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Logo/Brand */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">E</span>
        </div>

        {/* User Profile Info */}
        <div className="text-left">
          <p className="text-white font-semibold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {session?.user?.user_metadata?.full_name || "Guest"}
          </p>
          <div className="flex items-center text-gray-300 text-sm mt-0.5">
            <div className="flex items-center bg-green-500/20 px-2 py-0.5 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
              <Users className="w-4 h-4 mr-1 text-green-400" />
              <span className="font-medium text-green-300">
                {usersOnline.length} online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        className="group flex items-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 px-5 py-2.5 rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-105"
      >
        <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
        Sign Out
      </button>
    </header>
  );
}