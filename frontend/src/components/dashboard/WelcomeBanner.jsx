import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeBanner = ({ profile, loading }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = profile?.full_name?.trim().split(/\s+/)[0];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-6 text-white shadow-lg sm:p-8">
      <div className="pointer-events-none absolute -right-14 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
            <Sparkles size={14} aria-hidden="true" /> DermAssist care overview
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {greeting}{firstName ? `, ${firstName}` : ""}
            {loading && <span className="sr-only">, loading profile</span>}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">
            Your screenings, health records, and upcoming care in one place.
          </p>
        </div>
        <Link to="/lesion-tracker" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-950 transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950">
          Start a skin screening <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default WelcomeBanner;
