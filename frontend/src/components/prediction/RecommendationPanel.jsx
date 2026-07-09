import {
  ShieldAlert,
  CalendarDays,
  Camera,
  Sun,
  Download,
} from "lucide-react";

const RecommendationPanel = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <ShieldAlert
          size={30}
          className="text-amber-500"
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Recommended Next Steps
          </h2>

          <p className="text-slate-500">
            Follow these recommendations based on the AI analysis.
          </p>

        </div>

      </div>

      {/* Recommendation Cards */}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Doctor */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex items-center gap-3">

            <CalendarDays
              size={22}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-slate-800">
              Consult a Dermatologist
            </h3>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Schedule a medical consultation for a professional diagnosis
            and treatment plan.
          </p>

        </div>

        {/* Monitor */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex items-center gap-3">

            <Camera
              size={22}
              className="text-green-600"
            />

            <h3 className="font-semibold text-slate-800">
              Monitor Changes
            </h3>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Capture follow-up images if the lesion changes in size,
            shape, or color.
          </p>

        </div>

        {/* Sun */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex items-center gap-3">

            <Sun
              size={22}
              className="text-orange-500"
            />

            <h3 className="font-semibold text-slate-800">
              Protect Your Skin
            </h3>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Reduce UV exposure and use sunscreen while awaiting
            professional evaluation.
          </p>

        </div>

        {/* Report */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex items-center gap-3">

            <Download
              size={22}
              className="text-purple-600"
            />

            <h3 className="font-semibold text-slate-800">
              Save Your Report
            </h3>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Download or share your AI analysis report for future
            reference or medical consultation.
          </p>

        </div>

      </div>

      {/* Disclaimer */}

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">

        <p className="text-sm leading-6 text-red-700">

          <strong>Medical Disclaimer:</strong> DermAssist AI provides an
          AI-assisted preliminary assessment and is not a substitute for
          professional medical advice, diagnosis, or treatment.

        </p>

      </div>

    </div>
  );
};

export default RecommendationPanel;