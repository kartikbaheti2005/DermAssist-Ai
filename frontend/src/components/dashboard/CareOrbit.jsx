import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity, CalendarDays, FileHeart, FileText, MessageCircle,
  ScanLine, UsersRound, X, Sparkles,
} from "lucide-react";

const tools = [
  { label: "Skin screening", to: "/lesion-tracker", icon: ScanLine },
  { label: "Health records", to: "/health-records", icon: FileHeart },
  { label: "AI assistant", to: "/assistant", icon: MessageCircle },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Appointments", to: "/appointments", icon: CalendarDays },
  { label: "Care queue", to: "/queue", icon: UsersRound },
  { label: "Outbreak insights", to: "/outbreak", icon: Activity },
];

const CareOrbit = () => {
  const [open, setOpen] = useState(false);
  const [diameter, setDiameter] = useState(500);
  const frameRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const radius = Math.max(70, Math.min(184, diameter / 2 - 57));
  const positions = useMemo(() => tools.map((tool, index) => {
    const angle = -90 + (index * 360) / tools.length;
    const radians = angle * (Math.PI / 180);
    return { ...tool, angle, x: Math.cos(radians) * radius, y: Math.sin(radians) * radius };
  }), [radius]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setDiameter((current) => current === next ? current : next);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="care-orbit-title">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"><Sparkles size={14} aria-hidden="true" /> DermAssist AI</span>
        <h2 id="care-orbit-title" className="mt-3 text-xl font-bold tracking-tight text-slate-900">Your care tools, in orbit</h2>
        <p className="mt-1 text-sm text-slate-500">Open the orbit to move between your screening and care features.</p>
      </div>

      <div ref={frameRef} id="care-orbit-tools" role="group" className="relative mx-auto mt-4 aspect-square w-full max-w-[500px]" aria-label="DermAssist care tools">
        <div className="pointer-events-none absolute inset-0 rounded-full border border-blue-100/80" />
        <div className="pointer-events-none absolute inset-[12%] rounded-full border border-dashed border-slate-200" />

        {open && positions.map((item) => (
          <span key={`spoke-${item.label}`} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-px bg-gradient-to-r from-blue-200 to-cyan-100" style={{ width: radius, transformOrigin: "left center", transform: `rotate(${item.angle}deg)` }} />
        ))}

        <AnimatePresence>
          {open && positions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.to}
                className="absolute left-1/2 top-1/2 z-10"
                initial={reduceMotion ? { opacity: 1, x: item.x, y: item.y } : { opacity: 0, x: 0, y: 0, scale: 0.65 }}
                animate={{ opacity: 1, x: item.x, y: item.y, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 0, y: 0, scale: 0.7 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 30, delay: index * 0.035 }}
              >
                <Link to={item.to} className="group flex min-h-[74px] w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border border-blue-100 bg-white/95 px-2 py-2 text-center text-[11px] font-semibold leading-tight text-slate-700 shadow-md transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98]">
                  <Icon size={19} className="text-blue-600" aria-hidden="true" />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="care-orbit-tools"
          aria-label={open ? "Close care tools orbit" : "Open care tools orbit"}
          onClick={() => setOpen((value) => !value)}
          className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-900/20 ring-8 ring-blue-100/70 transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300 active:scale-[0.98] sm:h-28 sm:w-28"
        >
          {open ? <X size={23} aria-hidden="true" /> : <Sparkles size={23} aria-hidden="true" />}
          <span className="mt-1 text-[11px] font-bold">{open ? "Close orbit" : "Explore tools"}</span>
        </button>
      </div>
      <p className="sr-only">Seven links to current DermAssist pages. Use Escape or the center button to close.</p>
    </section>
  );
};

export default CareOrbit;
