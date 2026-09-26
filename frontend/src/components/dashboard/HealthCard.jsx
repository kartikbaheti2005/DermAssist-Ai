import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, Droplets, HeartPulse, Ruler, Weight } from "lucide-react";
import Card from "../common/Card";

const display = (value, suffix = "") => value === null || value === undefined || value === "" ? "Not added" : `${value}${suffix}`;
const HealthItem = ({ icon: Icon, title, value }) => (
  <div className="rounded-xl bg-slate-50 p-4">
    <Icon size={18} className="mb-3 text-blue-700" aria-hidden="true" />
    <p className="text-xs font-medium text-slate-500">{title}</p>
    <p className="mt-1 break-words text-base font-semibold text-slate-800">{value}</p>
  </div>
);

const HealthCard = ({ record, profile, loading }) => {
  const height = record?.height_cm ?? profile?.height_cm;
  const weight = record?.weight_kg ?? profile?.weight_kg;
  const bmi = record?.bmi ?? (height && weight ? (weight / ((height / 100) ** 2)).toFixed(1) : null);
  const updated = record?.record_date || record?.created_at;
  const updatedLabel = updated ? new Date(updated).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null;

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div><h2 className="text-lg font-semibold text-slate-900">Health snapshot</h2><p className="mt-1 text-sm text-slate-500">Latest details from your health record</p></div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><HeartPulse size={21} aria-hidden="true" /></span>
      </div>
      {loading ? <div className="mt-6 grid grid-cols-2 gap-3">{[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse rounded-xl bg-slate-100" />)}</div> : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <HealthItem icon={HeartPulse} title="BMI" value={display(bmi)} />
            <HealthItem icon={Droplets} title="Blood group" value={display(record?.blood_group ?? profile?.blood_group)} />
            <HealthItem icon={Ruler} title="Height" value={display(height, " cm")} />
            <HealthItem icon={Weight} title="Weight" value={display(weight, " kg")} />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="inline-flex items-center gap-2 text-xs text-slate-500"><CalendarClock size={15} aria-hidden="true" />{updatedLabel ? `Updated ${updatedLabel}` : "No health record yet"}</p>
            <Link to="/health-records" className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">{record ? "View record" : "Add health details"}<ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </>
      )}
    </Card>
  );
};

export default HealthCard;
