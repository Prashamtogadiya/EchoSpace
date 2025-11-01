import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";
import useChat from "./hooks/useChat";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import Landing from "./components/landing/Landing"; // new

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
    return <Landing signIn={signIn} />; // simplified, composed landing page
  }

  return (
    <div className="w-full flex h-screen justify-center items-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="border border-purple-500/20 max-w-6xl w-full min-h-[450px] rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20 text-white flex flex-col overflow-hidden">
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

