import { CalendarCheck, Clock3, FileHeart, ScanSearch } from "lucide-react";
import Card from "../common/Card";

const iconByKind = { prediction: ScanSearch, appointment: CalendarCheck, record: FileHeart };
const colorByKind = { prediction: "bg-blue-600", appointment: "bg-violet-600", record: "bg-emerald-600" };
const ActivityTimeline = ({ activities = [], loading }) => (
  <Card>
    <div className="mb-5"><h2 className="text-lg font-semibold text-slate-900">Recent activity</h2><p className="mt-1 text-sm text-slate-500">Latest updates from your account</p></div>
    {loading ? <div className="space-y-4" aria-label="Loading activity">{[1, 2, 3].map((item) => <div key={item} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div> : activities.length ? (
      <ol className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconByKind[activity.kind] || Clock3;
          return <li key={`${activity.kind}-${activity.date}-${index}`} className="relative flex gap-3">
            <span className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${colorByKind[activity.kind] || "bg-slate-500"}`}><Icon size={16} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0"><p className="text-sm font-semibold text-slate-800">{activity.title}</p><p className="mt-0.5 text-sm text-slate-500">{activity.description}</p><p className="mt-1 text-xs text-slate-400">{activity.date ? new Date(activity.date).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Date unavailable"}</p></div>
          </li>;
        })}
      </ol>
    ) : <div className="rounded-xl bg-slate-50 px-5 py-8 text-center"><p className="font-medium text-slate-800">Nothing to show yet</p><p className="mt-1 text-sm text-slate-500">Your scans, appointments, and health record updates will appear here.</p></div>}
  </Card>
);

export default ActivityTimeline;
