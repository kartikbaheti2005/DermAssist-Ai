import {
  Brain,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const findings = [
  {
    icon: CheckCircle2,
    title: "Primary Observation",
    text: "The lesion demonstrates a uniform pigment pattern with well-defined and symmetrical borders.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: AlertCircle,
    title: "Clinical Indicators",
    text: "No significant asymmetry, ulceration, bleeding, or irregular vascular structures were detected.",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    icon: Sparkles,
    title: "AI Interpretation",
    text: "The extracted visual features closely match benign melanocytic nevus patterns observed during model training.",
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
];

const AIAnalysisSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-sky-100 p-3">
          <Brain className="h-6 w-6 text-sky-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            AI Clinical Analysis
          </h2>

          <p className="text-sm text-slate-500">
            AI-generated interpretation of the uploaded lesion image.
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-5">

        {findings.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="flex items-start gap-4">

                <div className={`rounded-xl p-3 ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
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

      <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50 p-5">

        <h3 className="font-semibold text-sky-700">
          AI Conclusion
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-700">
          Based on the visual analysis, the lesion is most consistent with a
          benign melanocytic nevus. The confidence score is high and no
          high-risk visual indicators were detected. Continue routine skin
          monitoring and seek medical evaluation if the lesion changes in
          appearance, size, or symptoms.
        </p>

      </div>

    </section>
  );
};

export default AIAnalysisSection;