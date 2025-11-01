import React from "react";
import MockChat from "./MockChat";

export default function Hero({ signIn }) {
	return (
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
						</svg>
						Sign in with Google
					</button>

					<a className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/6 text-white hover:bg-white/10" href="#features">
						Learn more
					</a>
				</div>
			</div>

			{/* Visual / mock chat */}
			<MockChat />
		</div>
	);
}
