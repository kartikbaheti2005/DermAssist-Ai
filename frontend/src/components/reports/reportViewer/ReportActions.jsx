import {
  Download,
  Printer,
  Share2,
  CalendarPlus,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ReportActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Download PDF",
      subtitle: "Save this report for future reference.",
      icon: Download,
      color: "bg-sky-100 text-sky-600",
      onClick: () => {
        console.log("Download PDF");
      },
    },
    {
      title: "Print Report",
      subtitle: "Generate a printer-friendly version.",
      icon: Printer,
      color: "bg-violet-100 text-violet-600",
      onClick: () => window.print(),
    },
    {
      title: "Share Report",
      subtitle: "Share this report with your doctor.",
      icon: Share2,
      color: "bg-green-100 text-green-600",
      onClick: () => {
        console.log("Share Report");
      },
    },
    {
      title: "Book Consultation",
      subtitle: "Schedule an appointment with a dermatologist.",
      icon: CalendarPlus,
      color: "bg-amber-100 text-amber-600",
      onClick: () => navigate("/doctors"),
    },
    {
      title: "Ask AI",
      subtitle: "Understand this report with AI assistance.",
      icon: MessageCircle,
      color: "bg-pink-100 text-pink-600",
      onClick: () => navigate("/chatbot"),
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-800">
        Report Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Save, share, discuss, or take the next step based on this report.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-md"
            >
              <div className={`inline-flex rounded-xl p-3 ${action.color}`}>
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.subtitle}
              </p>
            </button>
          );
        })}

      </div>

    </section>
  );
};

export default ReportActions;