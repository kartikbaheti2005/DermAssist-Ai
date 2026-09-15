import { HeartPulse } from "lucide-react";

const HealthSnapshot = ({ healthSnapshot }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <HeartPulse className="text-blue-600" size={20} />
        <h3 className="text-base font-semibold text-gray-900">
          Health Snapshot
        </h3>
      </div>

      {/* Health Details */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">BMI</span>
          <span className="font-medium text-gray-900">
            {healthSnapshot.bmi}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Blood Group</span>
          <span className="font-medium text-gray-900">
            {healthSnapshot.bloodGroup}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Allergies</span>
          <span className="font-medium text-gray-900">
            {healthSnapshot.allergies}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Medications</span>
          <span className="font-medium text-gray-900">
            {healthSnapshot.medications}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HealthSnapshot;