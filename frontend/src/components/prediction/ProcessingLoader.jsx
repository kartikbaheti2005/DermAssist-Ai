import { Brain, CheckCircle2, Loader2 } from "lucide-react";

const processingSteps = [
  "Upload Verified",
  "Image Preprocessing",
  "Lesion Detection",
  "AI Classification",
  "Confidence Calculation",
  "Generating Report",
];

const ProcessingLoader = ({
  progress = 35,
  currentStep = 1,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

          <Brain
            size={40}
            className="animate-pulse text-blue-600"
          />

        </div>

        <h2 className="mt-6 text-3xl font-bold text-slate-800">
          DermAssist AI
        </h2>

        <p className="mt-2 text-slate-500">
          AI Skin Analysis in Progress
        </p>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div className="mb-2 flex justify-between text-sm">

          <span className="font-medium">
            Overall Progress
          </span>

          <span>
            {progress}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Steps */}

      <div className="mt-10 space-y-5">

        {processingSteps.map((step, index) => {

          const completed = index < currentStep;
          const active = index === currentStep;

          return (

            <div
              key={step}
              className="flex items-center gap-4"
            >

              {completed ? (

                <CheckCircle2
                  size={22}
                  className="text-green-500"
                />

              ) : active ? (

                <Loader2
                  size={22}
                  className="animate-spin text-blue-600"
                />

              ) : (

                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />

              )}

              <span
                className={`${
                  completed
                    ? "font-medium text-slate-700"
                    : active
                    ? "font-semibold text-blue-600"
                    : "text-slate-400"
                }`}
              >
                {step}
              </span>

            </div>

          );
        })}

      </div>

      {/* Footer */}

      <div className="mt-10 rounded-xl bg-blue-50 p-5">

        <p className="text-center text-sm text-blue-700">

          Please wait while DermAssist AI analyzes your uploaded image.
          This usually takes only a few seconds.

        </p>

      </div>

    </div>
  );
};

export default ProcessingLoader;