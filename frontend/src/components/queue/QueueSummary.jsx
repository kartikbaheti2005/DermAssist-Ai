import {
  Clock3,
  UserRound,
  Users,
  BadgeAlert,
  Stethoscope,
} from "lucide-react";

const QueueSummary = ({ queueSummary }) => {
  const priorityStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Queue Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your current consultation status.
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            priorityStyles[queueSummary.priority]
          }`}
        >
          {queueSummary.priority} Priority
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        <InfoCard
          icon={<BadgeAlert size={20} />}
          label="Queue Number"
          value={queueSummary.queueNumber}
        />

        <InfoCard
          icon={<Users size={20} />}
          label="Patients Ahead"
          value={queueSummary.patientsAhead}
        />

        <InfoCard
          icon={<Clock3 size={20} />}
          label="Estimated Wait"
          value={queueSummary.estimatedWait}
        />

        <InfoCard
          icon={<UserRound size={20} />}
          label="Doctor"
          value={queueSummary.doctor}
        />

        <InfoCard
          icon={<Stethoscope size={20} />}
          label="Specialization"
          value={queueSummary.specialization}
        />

        <InfoCard
          icon={<Clock3 size={20} />}
          label="Appointment"
          value={queueSummary.appointmentTime}
        />
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}) => (
  <div className="rounded-lg border border-gray-200 p-4">
    <div className="mb-3 flex items-center gap-2 text-blue-600">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>

    <p className="text-lg font-semibold text-gray-900">
      {value}
    </p>
  </div>
);

export default QueueSummary;