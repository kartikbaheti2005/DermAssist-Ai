import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";

const stats = [
  {
    title: "Upcoming",
    value: 2,
    icon: CalendarDays,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Pending",
    value: 1,
    icon: Clock3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Confirmed",
    value: 3,
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Completed",
    value: 18,
    icon: ClipboardCheck,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
];

const AppointmentStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon ?? ClipboardCheck;
        
        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>

            <h3 className="mt-5 text-3xl font-bold text-slate-800">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentStats;