import {
  Activity,
  ScanSearch,
  FileText,
  HeartPulse,
} from "lucide-react";

const HealthSummary = ({data}) => {

  const summary = [
    {
      title: "AI Scans",
      value: "0",
      subtitle: "Completed",
      icon: ScanSearch,
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Reports",
      value: "0",
      subtitle: "Generated",
      icon: FileText,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Health",
      value: "Excellent",
      subtitle: "Overall",
      icon: HeartPulse,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Health Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          A quick overview of your current health records.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

        {summary.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 p-5 transition hover:shadow-md"
            >

              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
              >

                <Icon size={22} />

              </div>

              <h3 className="text-sm text-slate-500">
                {item.title}
              </h3>

              <p className="mt-1 text-2xl font-bold text-slate-800">
                {item.value}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {item.subtitle}
              </p>

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default HealthSummary;