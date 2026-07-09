import { BrainCircuit } from "lucide-react";

const PredictionSummary = ({ latestPrediction }) => {
  const riskStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <BrainCircuit className="text-blue-600" size={20} />

        <h3 className="text-base font-semibold text-gray-900">
          Latest Prediction
        </h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Condition</span>

          <span className="font-medium text-gray-900">
            {latestPrediction.disease}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Confidence</span>

          <span className="font-medium text-gray-900">
            {latestPrediction.confidence}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Risk Level</span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              riskStyles[latestPrediction.risk]
            }`}
          >
            {latestPrediction.risk}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Model</span>

          <span className="text-right font-medium text-gray-900">
            {latestPrediction.model}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictionSummary;