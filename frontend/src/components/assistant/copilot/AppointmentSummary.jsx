import { CalendarDays, ChevronRight } from "lucide-react";

const AppointmentSummary = ({ nextAppointment }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays
          size={20}
          className="text-blue-600"
        />

        <h3 className="text-base font-semibold text-gray-900">
          Upcoming Appointment
        </h3>
      </div>

      {/* Appointment Details */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Doctor</span>

          <span className="font-medium text-gray-900">
            {nextAppointment.doctor}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Specialization</span>

          <span className="font-medium text-gray-900">
            {nextAppointment.specialization}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Date</span>

          <span className="font-medium text-gray-900">
            {nextAppointment.date}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Time</span>

          <span className="font-medium text-gray-900">
            {nextAppointment.time}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Status</span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              statusStyles[nextAppointment.status]
            }`}
          >
            {nextAppointment.status}
          </span>
        </div>
      </div>

      {/* Action */}
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
        View Appointment
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default AppointmentSummary;