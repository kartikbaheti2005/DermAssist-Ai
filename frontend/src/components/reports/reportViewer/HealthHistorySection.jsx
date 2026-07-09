import {
  History,
  Activity,
  TrendingUp,
  CalendarClock,
} from "lucide-react";

const stats = [
  {
    icon: Activity,
    label: "Total AI Scans",
    value: "12",
    color: "text-sky-600",
  },
  {
    icon: TrendingUp,
    label: "Overall Risk Trend",
    value: "Stable",
    color: "text-green-600",
  },
  {
    icon: CalendarClock,
    label: "Last Scan",
    value: "26 June 2026",
    color: "text-violet-600",
  },
];

const history = [
  {
    date: "26 June 2026",
    disease: "Melanocytic Nevus",
    risk: "Low",
  },
  {
    date: "18 June 2026",
    disease: "Benign Keratosis",
    risk: "Low",
  },
  {
    date: "10 June 2026",
    disease: "Dermatofibroma",
    risk: "Low",
  },
];

const HealthHistorySection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-violet-100 p-3">
          <History className="h-6 w-6 text-violet-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Skin Health History
          </h2>

          <p className="text-sm text-slate-500">
            Overview of previous AI skin analyses.
          </p>
        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>

                  <h3 className={`mt-1 text-lg font-bold ${item.color}`}>
                    {item.value}
                  </h3>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Previous Reports */}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3 text-left text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-slate-600">
                Diagnosis
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-slate-600">
                Risk
              </th>

            </tr>

          </thead>

          <tbody>

            {history.map((item) => (
              <tr
                key={item.date}
                className="border-t border-slate-100"
              >
                <td className="px-5 py-4 text-sm text-slate-600">
                  {item.date}
                </td>

                <td className="px-5 py-4 font-medium text-slate-800">
                  {item.disease}
                </td>

                <td className="px-5 py-4">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {item.risk}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default HealthHistorySection;