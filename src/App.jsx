import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [session, setSession] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUsersOnline] = useState([]);

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
  // console.log(session);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    if (!session?.user) {
      setUsersOnline([]);
      return;
    }

    const roomOne = supabase.channel("chatroom1", {
      config: {
        presence: {
          key: session?.user?.id,
        },
      },
    });

    roomOne.on("broadcast", { event: "message" }, (payload) => {
      setMessages((prevMessages) => [...prevMessages, payload.payload]);
      console.log(messages);
    });

    //track use presence
    roomOne.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await roomOne.track({
          id: session?.user?.id,
        });
      }
    });

    //handle user presence
    roomOne.on("presence", { event: "sync" }, () => {
      const state = roomOne.presenceState();
      setUsersOnline(Object.keys(state));
    });

    return () => {
      roomOne.unsubscribe();
    };
  }, [session]);

  //send message
  const sendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      message: newMessage,
      user_name: session?.user?.user_metadata?.full_name,
      avatar: session?.user?.user_metadata?.avatar,
      timestamp: new Date().toISOString(),
    };
    console.log("user_name is : ", messageData.user_name);

    // Send to others
    supabase.channel("chatroom1").send({
      type: "broadcast",
      event: "message",
      payload: messageData,
    });

    // Also add locally so you can see your own message immediately
    setMessages((prev) => [...prev, messageData]);

    setNewMessage("");
  };

  if (!session?.user) {
    return (
      <div className="w-full flex  h-screen justify-center items-center">
        <button onClick={signIn}>Sign in with Google to chat</button>
      </div>
    );
  } else {
    return (
      <div className="w-full flex  h-screen justify-center items-center p-4">
        <div className="border-[1px] border-gray-700 max-w-6xl w-full min-h-[450px] rounded-lg">
          {/* Header */}
          <div className="flex justify-between h-20 border-b-[1px] border-gray-700">
            <div className="p-4">
              <p className="text-gray-300">
                Signed is as {session?.user?.user_metadata?.full_name}
              </p>
              <p className="text-gray-300 italic text-sm">3 users online </p>
            </div>
            <button onClick={signOut} className="m-2 sm:mr-4">
              Sign out
            </button>
          </div>
          {/* main chat */}
          <div className="p-4 flex flex-col overflow-y-auto h-[500px]">
            {messages.map((msg, idx) => (
              <div
                className={`my-2 flex w-full items-start ${
                  msg.user_name === session?.user?.user_metadata?.full_name
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={idx}
              >
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          {/* message input */}
          <form
            onSubmit={sendMessage}
            className="flex flex-col sm:flex-row p-4 border-t-[1px] border-gray-700"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              placeholder="Type a message..."
              className="p-2 w-full bg-[#00000040] rounded-lg"
            />
            <button className="mt-4 sm:mt-0 sm:ml-8 text-white max-h-12">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
