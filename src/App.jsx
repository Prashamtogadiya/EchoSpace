import { useEffect, useState, useRef, useEffectEvent } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUsersOnline] = useState([]);
  const channelRef = useRef(null);
  const chatContainerRef = useRef(null);
  const scroll = useRef(null);

  // ---------------- AUTH ----------------
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // ---------------- PRESENCE & MESSAGES ----------------
  useEffect(() => {
    if (!session?.user) {
      setUsersOnline([]);
      return;
    }

    const room = supabase.channel("chatroom1", {
      config: {
        presence: {
          key: String(session.user.id),
        },
      },
    });

    channelRef.current = room;

    // ---- Receive Messages ----
    room.on("broadcast", { event: "message" }, (payload) => {
      setMessages((prev) => [...prev, payload.payload]);
    });

    // ---- Presence Handlers ----
    const updateUsers = () => {
      const state = room.presenceState();
      const users = Object.values(state)
        .flat()
        .map((meta) => ({
          id: meta?.id,
          name: meta?.name || meta?.email || "Unknown",
          avatar: meta?.avatar,
        }));
      setUsersOnline(users);
    };

    room
      .on("presence", { event: "sync" }, updateUsers)
      .on("presence", { event: "join" }, updateUsers)
      .on("presence", { event: "leave" }, updateUsers);

    room.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await room.track({
          id: session.user.id,
          name: session.user.user_metadata.full_name,
          email: session.user.user_metadata.email,
          avatar: session.user.user_metadata.avatar_url,
          online_at: new Date().toISOString(),
        });
      }
    });

    return () => {
      try {
        room.unsubscribe();
      } catch (e) {
        // ignore cleanup errors
      }
      channelRef.current = null;
    };
  }, [session]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      message: newMessage,
      user_name: session?.user?.user_metadata?.email,
      avatar: session?.user?.user_metadata?.avatar_url,
      timestamp: new Date().toISOString(),
    };

    // Send to channel
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "message",
        payload: messageData,
      });
    } else {
      // fallback if channel not active
      supabase.channel("chatroom1").send({
        type: "broadcast",
        event: "message",
        payload: messageData,
      });
    }

    // Show own message instantly
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  // ---------------- UTIL ----------------
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(()=>{
    setTimeout(()=>{
      if(chatContainerRef.current){
chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    },100)
  },[messages])

  // ---------------- UI ----------------
  if (!session?.user) {
    return (
      <div className="w-full flex h-screen justify-center items-center">
        <button
          onClick={signIn}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Sign in with Google to chat
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex h-screen justify-center items-center p-4">
      <div className="border border-gray-700 max-w-6xl w-full min-h-[450px] rounded-lg bg-[#0a0a0a] text-white flex flex-col">
        {/* Header */}
        <div className="flex justify-between h-20 border-b border-gray-700 items-center px-4">
          <div>
            <p className="text-gray-300">
              Signed in as {session?.user?.user_metadata?.full_name}
            </p>
            <p className="text-gray-400 italic text-sm">
              {usersOnline.length} user
              {usersOnline.length !== 1 ? "s" : ""} online{" "}
            </p>
          </div>
          <button
            onClick={signOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            Sign out
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="p-4 flex flex-col overflow-y-auto h-[500px]">
          {messages.map((msg, idx) => (
            <div
              className={`my-2 flex w-full items-start ${
                msg.user_name === session?.user?.user_metadata?.email
                  ? "justify-end"
                  : "justify-start"
              }`}
              key={idx}
            >
              {msg.user_name !== session?.user?.user_metadata?.email && (
                <img
                  src={msg.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full mr-2"
                />
              )}

              <div className="flex flex-col w-full">
                <div
                  className={`p-2 max-w-[70%] rounded-xl ${
                    msg.user_name === session?.user?.user_metadata?.email
                      ? "bg-gray-700 text-white ml-auto"
                      : "bg-gray-500 text-white mr-auto"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
                <div
                  className={`text-xs opacity-75 pt-1 ${
                    msg.user_name === session?.user?.user_metadata?.email
                      ? "text-right mr-2"
                      : "text-left ml-2"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>

              {msg.user_name === session?.user?.user_metadata?.email && (
                <img
                  src={msg.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full ml-2"
                />
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
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
          <span ref={scroll}></span>
        </form>
      </div>
    </div>
  );
}

export default App;

