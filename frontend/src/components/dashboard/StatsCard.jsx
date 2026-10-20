const colors = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  red: "bg-rose-50 text-rose-700 ring-rose-100",
  purple: "bg-violet-50 text-violet-700 ring-violet-100",
  orange: "bg-amber-50 text-amber-700 ring-amber-100",
};

const StatsCard = ({ title, value, icon: Icon, color = "blue", loading = false }) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {loading ? <div className="mt-3 h-8 w-16 animate-pulse rounded-lg bg-slate-100" aria-label="Loading" /> : <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>}
      </div>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${colors[color] || colors.blue}`}>
        <Icon size={23} aria-hidden="true" />
      </div>
    </div>
  </article>
);

export default StatsCard;
