import {
  CheckCircle2,
  ShieldAlert,
  Activity,
  Clock3,
} from "lucide-react";

const ResultCard = () => {
  const prediction = {
    disease: "Melanoma",
    confidence: 96.4,
    risk: "High Risk",
    riskColor: "bg-red-500",
    recommendation: "Consult a dermatologist as soon as possible.",
    probabilities: [
      { name: "Melanoma", value: 96.4 },
      { name: "Basal Cell Carcinoma", value: 2.1 },
      { name: "Nevus", value: 0.9 },
      { name: "Benign Keratosis", value: 0.6 },
    ],
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <CheckCircle2
          size={32}
          className="text-green-500"
        />

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Analysis Complete
          </h2>

          <p className="text-slate-500">
            DermAssist AI has completed the image analysis.
          </p>

        </div>

      </div>

      {/* Main Summary */}

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-blue-50 p-6">

          <p className="text-sm text-slate-500">
            Primary Finding
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {prediction.disease}
          </h3>

        </div>

        <div className="rounded-xl bg-green-50 p-6">

          <p className="text-sm text-slate-500">
            AI Confidence
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-700">
            {prediction.confidence}%
          </h3>

        </div>

        <div className="rounded-xl bg-red-50 p-6">

          <p className="text-sm text-slate-500">
            Risk Level
          </p>

          <span
            className={`${prediction.riskColor} mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold text-white`}
          >
            {prediction.risk}
          </span>

        </div>

      </div>

      {/* Top Predictions */}

      <div className="mt-10">

        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800">

          <Activity size={20} />

          Top Predictions

        </h3>

        <div className="mt-6 space-y-5">

          {prediction.probabilities.map((item) => (

            <div key={item.name}>

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-slate-700">
                  {item.name}
                </span>

                <span className="font-semibold text-slate-700">
                  {item.value}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Recommendation */}

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">

        <div className="flex items-start gap-3">

          <ShieldAlert
            size={22}
            className="mt-1 text-amber-600"
          />

          <div>

            <h4 className="font-semibold text-amber-800">
              Recommended Action
            </h4>

            <p className="mt-2 text-sm leading-6 text-amber-700">
              {prediction.recommendation}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 flex items-center justify-between border-t pt-6 text-sm text-slate-500">

        <div className="flex items-center gap-2">

          <Clock3 size={16} />

          Today • 4:32 PM

        </div>

        <div>

          DermAssist AI v1

        </div>

      </div>

    </div>
  );
};

export default ResultCard;