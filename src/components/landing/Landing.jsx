import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CTAFooter from "./CTAFooter";

export default function Landing({ signIn }) {
	return (
		<div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<div className="max-w-7xl w-full mx-auto py-12 px-6 space-y-12">
				<Hero signIn={signIn} />
				<Features />
				<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<HowItWorks />
					<Testimonials />
				</section>
				<CTAFooter signIn={signIn} />
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
