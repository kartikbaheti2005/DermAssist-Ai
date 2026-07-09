import {
  ClipboardCheck,
  CalendarClock,
  Shield,
  Stethoscope,
} from "lucide-react";

const recommendations = [
  {
    icon: ClipboardCheck,
    title: "Immediate Action",
    text: "No urgent medical intervention is required based on the current AI assessment.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: CalendarClock,
    title: "Follow-up",
    text: "Repeat a skin scan or consult a dermatologist in 6–12 months, or sooner if noticeable changes occur.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    text: "Use sunscreen daily, avoid excessive UV exposure, and monitor the lesion for changes in size, color, or shape.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Stethoscope,
    title: "Medical Advice",
    text: "If itching, bleeding, pain, rapid growth, or irregular borders develop, schedule an appointment with a dermatologist immediately.",
    color: "bg-red-100 text-red-600",
  },
];

const RecommendationSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-green-100 p-3">
          <ClipboardCheck className="h-6 w-6 text-green-600" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Recommendations & Next Steps
          </h2>

          <p className="text-sm text-slate-500">
            Personalized guidance generated from your AI skin analysis.
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {recommendations.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="flex items-start gap-4">

                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>

                </div>

              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default RecommendationSection;