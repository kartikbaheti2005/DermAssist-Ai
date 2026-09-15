import {
  ClipboardCheck,
  CalendarClock,
  Shield,
  Stethoscope,
} from "lucide-react";

const buildRecommendations = (report) => [

    {
        icon: ClipboardCheck,
        title: "Predicted Condition",
        text: report?.recommendation?.predicted_label,
        color: "bg-green-100 text-green-600",
    },

    {
        icon: Stethoscope,
        title: "Recommended Specialist",
        text: report?.recommendation?.recommended_specialty,
        color: "bg-sky-100 text-sky-600",
    },

];

const RecommendationSection = ({ report }) => {
  const recommendations = report? buildRecommendations(report): [];  
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

      {report?.recommendation?.doctors?.length === 0 && (

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
          
              <p className="text-sm text-slate-600">

                  No recommended doctors are available yet.
                  Browse all dermatologists from the Doctors page.

              </p>

          </div>

      )}

    </section>
  );
};

export default RecommendationSection;