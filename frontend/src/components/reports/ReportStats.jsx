import {
  FileText,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

const ReportStats = () => {
  const stats = [
    {
      title: "Total Reports",
      value: 12,
      icon: FileText,
      color: "text-sky-600",
      bg: "bg-sky-100",
    },
    {
      title: "High Risk",
      value: 2,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Medium Risk",
      value: 4,
      icon: ShieldAlert,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "Low Risk",
      value: 6,
      icon: ShieldCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-3 ${item.bg}`}
              >
                <Icon
                  className={`h-6 w-6 ${item.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportStats;