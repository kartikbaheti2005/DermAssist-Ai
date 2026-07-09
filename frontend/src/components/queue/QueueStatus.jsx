import { Activity } from "lucide-react";

const QueueStatus = ({ queueStatus }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <Activity
          size={20}
          className="text-blue-600"
        />

        <h2 className="text-lg font-semibold text-gray-900">
          Current Queue Status
        </h2>
      </div>

      {/* Status */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Current Stage
        </p>

        <h3 className="mt-1 text-2xl font-bold text-blue-600">
          {queueStatus.currentStage}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {queueStatus.status}
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">
            Consultation Progress
          </span>

          <span className="font-semibold text-blue-600">
            {queueStatus.progress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${queueStatus.progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;