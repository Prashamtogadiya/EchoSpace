import React from "react";

export default function Testimonials() {
	return (
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
	);
}
