import React from "react";

export default function CTAFooter({ signIn }) {
	return (
		<div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-700/60 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<div>
				<h3 className="text-xl font-semibold text-white">Ready to try EchoSpace?</h3>
				<p className="text-slate-300 text-sm">Perfect for product demos, portfolios, and team collaboration.</p>
			</div>

			<div className="flex items-center gap-3">
				<button onClick={signIn} className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold">
					Sign in with Google
				</button>
				<a className="px-4 py-3 rounded-xl bg-white/6 text-white" href="#features">Explore features</a>
			</div>
		</div>
	);
}
