import React from "react";

export default function MockChat() {
	return (
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
	);
}
