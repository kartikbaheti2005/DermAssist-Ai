import { useEffect, useState } from "react";
import {
    getPredictionReport,
    getPredictions,
} from "../../api/predictionApi";

import {
    FileText,
    AlertTriangle,
    ShieldAlert,
    ShieldCheck,
} from "lucide-react";

const ReportStats = () => {

    const [stats, setStats] = useState([
        {
            title: "Total Reports",
            value: 0,
            icon: FileText,
            color: "text-sky-600",
            bg: "bg-sky-100",
        },
        {
            title: "High Risk",
            value: 0,
            icon: AlertTriangle,
            color: "text-red-600",
            bg: "bg-red-100",
        },
        {
            title: "Medium Risk",
            value: 0,
            icon: ShieldAlert,
            color: "text-amber-600",
            bg: "bg-amber-100",
        },
        {
            title: "Low Risk",
            value: 0,
            icon: ShieldCheck,
            color: "text-green-600",
            bg: "bg-green-100",
        },
    ]);

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const report =
                await getPredictionReport();

            const history =
                await getPredictions();

            const medium =
                history.filter(
                    p => p.risk_level === "medium"
                ).length;

            const low =
                history.filter(
                    p => p.risk_level === "low"
                ).length;

            setStats([
                {
                    title: "Total Reports",
                    value: report.total_predictions,
                    icon: FileText,
                    color: "text-sky-600",
                    bg: "bg-sky-100",
                },
                {
                    title: "High Risk",
                    value: report.high_risk_predictions,
                    icon: AlertTriangle,
                    color: "text-red-600",
                    bg: "bg-red-100",
                },
                {
                    title: "Medium Risk",
                    value: medium,
                    icon: ShieldAlert,
                    color: "text-amber-600",
                    bg: "bg-amber-100",
                },
                {
                    title: "Low Risk",
                    value: low,
                    icon: ShieldCheck,
                    color: "text-green-600",
                    bg: "bg-green-100",
                },
            ]);

        } catch (err) {

            console.error(err);

        }

    };

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