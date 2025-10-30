import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";
import useChat from "./hooks/useChat";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [session, setSession] = useState(null);

  // AUTH: keep original behavior
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
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // useChat contains presence, messages, sendMessage and scrolling refs
  const {
    messages,
    newMessage,
    setNewMessage,
    usersOnline,
    sendMessage,
    chatContainerRef,
  } = useChat(session);

  // UI
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
        <Header
          session={session}
          usersOnline={usersOnline}
          onSignOut={signOut}
        />

        <ChatWindow
          messages={messages}
          session={session}
          chatContainerRef={chatContainerRef}
        />

        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;

