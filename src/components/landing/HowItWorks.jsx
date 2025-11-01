import React from "react";

export default function HowItWorks() {
	return (
		<div className="col-span-2 p-6 bg-white/4 rounded-2xl">
			<h3 className="text-2xl font-semibold text-white mb-4">How it works</h3>
			<ol className="space-y-4 list-decimal list-inside text-slate-300">
				<li><strong>Create or join</strong> a space and invite collaborators.</li>
				<li><strong>Chat in real time</strong> with presence and live updates.</li>
				<li><strong>Share and iterate</strong> — messages sync across devices instantly.</li>
			</ol>
		</div>
	);
}
