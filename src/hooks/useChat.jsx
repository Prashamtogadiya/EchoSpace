import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function useChat(session) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUsersOnline] = useState([]);
  const channelRef = useRef(null);
  const chatContainerRef = useRef(null);

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

    // Receive messages
    room.on("broadcast", { event: "message" }, (payload) => {
      setMessages((prev) => [...prev, payload.payload]);
    });

    // presence handlers
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

  const sendMessage = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      message: newMessage,
      user_name: session?.user?.user_metadata?.email,
      avatar: session?.user?.user_metadata?.avatar_url,
      timestamp: new Date().toISOString(),
    };

    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "message",
        payload: messageData,
      });
    } else {
      // fallback
      supabase.channel("chatroom1").send({
        type: "broadcast",
        event: "message",
        payload: messageData,
      });
    }

    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  // auto-scroll on new messages
  useEffect(() => {
    const id = setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(id);
  }, [messages]);

  return {
    messages,
    newMessage,
    setNewMessage,
    usersOnline,
    sendMessage,
    chatContainerRef,
  };
}
