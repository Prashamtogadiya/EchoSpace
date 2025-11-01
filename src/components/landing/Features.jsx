import React from "react";

export default function Features() {
	return (
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
	);
}
