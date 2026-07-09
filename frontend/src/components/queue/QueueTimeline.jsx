import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

const QueueTimeline = ({ queueTimeline }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Consultation Timeline
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your consultation progress.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {queueTimeline.map((step, index) => (
          <div
            key={step.id}
            className="relative flex gap-4"
          >
            {/* Timeline Line */}
            {index !== queueTimeline.length - 1 && (
              <div
                className={`absolute left-[15px] top-8 h-full w-0.5 ${
                  step.completed
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            )}

            {/* Icon */}
            <div className="z-10">
              {step.completed ? (
                <CheckCircle2
                  size={30}
                  className="text-green-500"
                />
              ) : step.current ? (
                <Clock3
                  size={30}
                  className="text-blue-600"
                />
              ) : (
                <Circle
                  size={30}
                  className="text-gray-400"
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-2">
              <h3
                className={`font-semibold ${
                  step.current
                    ? "text-blue-600"
                    : "text-gray-900"
                }`}
              >
                {step.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {step.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueTimeline;