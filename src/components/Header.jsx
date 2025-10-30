import React from "react";

export default function Header({ session, usersOnline, onSignOut }) {
  return (
    <div className="flex justify-between h-20 border-b border-gray-700 items-center px-4">
      <div>
        <p className="text-gray-300">
          Signed in as {session?.user?.user_metadata?.full_name}
        </p>
        <p className="text-gray-400 italic text-sm">
          {usersOnline.length} user{usersOnline.length !== 1 ? "s" : ""} online
        </p>
      </div>
      <button
        onClick={onSignOut}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
      >
        Sign out
      </button>
    </div>
  );
}
