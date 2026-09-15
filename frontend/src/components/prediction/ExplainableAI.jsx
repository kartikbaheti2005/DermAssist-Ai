import {
  Brain,
  Eye,
  BarChart3,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

const ExplainableAI = () => {
  const findings = [
    "Border irregularity detected",
    "Color variation observed",
    "Asymmetrical lesion structure",
    "Large lesion diameter",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <Brain
          size={30}
          className="text-blue-600"
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            AI Decision Insights
          </h2>

          <p className="text-slate-500">
            Understand how DermAssist AI reached its prediction.
          </p>

        </div>

      </div>

      {/* Main Grid */}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* Left */}

        <div>

          <div className="rounded-xl bg-slate-50 p-6">

            <div className="flex items-center gap-2">

              <BarChart3
                size={20}
                className="text-blue-600"
              />

              <h3 className="font-semibold text-slate-800">
                Confidence Summary
              </h3>

            </div>

            <div className="mt-5 space-y-5">

              <div>

                <div className="mb-2 flex justify-between">

                  <span>Prediction Confidence</span>

                  <span className="font-semibold">
                    96%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: "96%" }}
                  />

                </div>

              </div>

              <div>

                <div className="mb-2 flex justify-between">

                  <span>Image Quality</span>

                  <span className="font-semibold">
                    Excellent
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "92%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-6">

            <div className="flex items-center gap-2">

              <Eye
                size={20}
                className="text-blue-600"
              />

              <h3 className="font-semibold text-slate-800">
                Features Detected
              </h3>

            </div>

            <div className="mt-5 space-y-4">

              {findings.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="text-green-500"
                  />

                  <span className="text-slate-600">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Right */}

        <div>

          <div
            className="
              flex
              h-full
              min-h-[340px]
              flex-col
              items-center
              justify-center
              rounded-xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
            "
          >

            <ImageIcon
              size={60}
              className="text-slate-400"
            />

            <h3 className="mt-5 text-xl font-semibold text-slate-700">
              Explainability Heatmap
            </h3>

            <p className="mt-3 max-w-sm text-center text-sm leading-6 text-slate-500">

              Grad-CAM visualization will highlight the
              image regions that influenced the AI's
              prediction.

            </p>

            <div className="mt-6 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">

              Coming in Phase 4

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExplainableAI;