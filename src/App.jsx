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
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl w-full mx-auto py-12 px-6 space-y-12">
          {/* HERO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                EchoSpace
              </h1>
              <p className="text-slate-200 max-w-xl text-lg">
                Real-time conversations, instantly synced. Share ideas, get feedback, and collaborate — all in one beautiful space.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button
                  onClick={signIn}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.6 11.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C20.97 17.16 22.17 14.34 22.17 10.99z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </button>

                <a
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/6 text-white hover:bg-white/10"
                  href="#features"
                >
                  Learn more
                </a>
              </div>
            </div>

            {/* Visual / mock chat */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-800 via-purple-800 to-pink-800 p-6">
              <div className="h-64 md:h-72 rounded-xl bg-slate-900/60 p-4 backdrop-blur-sm border border-white/5 flex flex-col">
                {/* Top header inside mock chat to indicate global room */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12h20M12 2c3.5 3.5 3.5 15 0 18M12 2C8.5 5.5 8.5 18 12 21" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-white">Global Chat</div>
                      <div className="text-xs text-slate-400">Public room — everyone welcome</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">Active now</div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/40"></div>
                      <div className="flex-1">
                        <div className="h-3 w-36 rounded bg-slate-700 mb-2"></div>
                        <div className="h-2 w-24 rounded bg-slate-700"></div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-48 rounded bg-slate-700"></div>
                      <div className="h-3 w-36 rounded bg-slate-700 ml-8"></div>
                      <div className="h-3 w-40 rounded bg-slate-700"></div>
                    </div>
                  </div>

                  <div className="flex justify-end items-center gap-3">
                    <div className="h-8 w-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm">Nice work!</div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <section id="features" className="bg-white/3 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-3">💬</div>
                <div className="font-semibold">Instant Messaging</div>
                <div className="text-sm text-slate-300 mt-2">Low-latency chat with rich message support.</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-3">🔒</div>
                <div className="font-semibold">Secure Auth</div>
                <div className="text-sm text-slate-300 mt-2">Sign in with Google through Supabase.</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-3">📱</div>
                <div className="font-semibold">Responsive</div>
                <div className="text-sm text-slate-300 mt-2">Works across devices and screen sizes.</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-3">⚙️</div>
                <div className="font-semibold">Extensible</div>
                <div className="text-sm text-slate-300 mt-2">Easy to integrate with other tools and services.</div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 p-6 bg-white/4 rounded-2xl">
              <h3 className="text-2xl font-semibold text-white mb-4">How it works</h3>
              <ol className="space-y-4 list-decimal list-inside text-slate-300">
                <li><strong>Create or join</strong> a space and invite collaborators.</li>
                <li><strong>Chat in real time</strong> with presence and live updates.</li>
                <li><strong>Share and iterate</strong> — messages sync across devices instantly.</li>
              </ol>
            </div>

            {/* TESTIMONIAL */}
            <div className="p-6 bg-white/5 rounded-2xl">
              <h4 className="text-lg font-semibold text-white mb-3">What people say</h4>
              <div className="space-y-4 text-slate-300">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="italic">"EchoSpace made remote collaboration seamless for our team."</p>
                  <div className="mt-3 text-sm font-medium">— Alex Johnson, Product Lead</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="italic">"Beautiful UI and instant updates. Great for demos."</p>
                  <div className="mt-3 text-sm font-medium">— Priya K., Designer</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA + FOOTER */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-700/60 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Ready to try EchoSpace?</h3>
              <p className="text-slate-300 text-sm">Perfect for product demos, portfolios, and team collaboration.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={signIn}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold"
              >
                Sign in with Google
              </button>
              <a className="px-4 py-3 rounded-xl bg-white/6 text-white" href="#features">Explore features</a>
            </div>
          </div>

          <footer className="text-slate-400 text-sm text-center pt-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-3">Built with React • Supabase • Tailwind</div>
              <div>© {new Date().getFullYear()} EchoSpace — Demo project</div>
            </div>
          </footer>
        </div>
      </div>
    );
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

