import {
  Upload,
  Brain,
  FileCheck,
  CalendarCheck,
} from "lucide-react";

const timeline = [
  {
    title: "Image Uploaded",
    date: "26 June 2026 • 10:15 AM",
    icon: Upload,
  },
  {
    title: "AI Analysis Completed",
    date: "26 June 2026 • 10:16 AM",
    icon: Brain,
  },
  {
    title: "Report Generated",
    date: "26 June 2026 • 10:17 AM",
    icon: FileCheck,
  },
  {
    title: "Consultation Recommended",
    date: "26 June 2026",
    icon: CalendarCheck,
  },
];

const ReportTimeline = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-800">
        Report Timeline
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Timeline of events for this report.
      </p>

      <div className="mt-8 space-y-6">

        {timeline.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">

                <div className="rounded-full bg-sky-100 p-3">
                  <Icon className="h-5 w-5 text-sky-600" />
                </div>

                {index !== timeline.length - 1 && (
                  <div className="mt-2 h-10 w-px bg-slate-300" />
                )}

              </div>

              <div>

                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.date}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default ReportTimeline;