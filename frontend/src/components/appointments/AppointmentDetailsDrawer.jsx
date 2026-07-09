import {
  X,
  CalendarDays,
  Clock3,
  Building2,
  FileText,
  StickyNote,
} from "lucide-react";

import AppointmentStatusBadge from "./AppointmentStatusBadge";

const AppointmentDetailsDrawer = ({
  appointment,
  open,
  onClose,
}) => {
  if (!open || !appointment) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Appointment Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your consultation details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          {/* Doctor */}
          <div className="flex gap-4">
            <img
              src={appointment.image}
              alt={appointment.doctorName}
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-semibold text-slate-800">
                {appointment.doctorName}
              </h3>

              <p className="text-sky-600">
                {appointment.specialization}
              </p>

              <div className="mt-2">
                <AppointmentStatusBadge
                  status={appointment.status}
                />
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-slate-500" />
              <span>{appointment.hospital}</span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-slate-500" />
              <span>{appointment.date}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-slate-500" />
              <span>{appointment.time}</span>
            </div>

          </div>

          {/* Reason */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" />

              <h4 className="font-semibold text-slate-800">
                Reason
              </h4>
            </div>

            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              {appointment.reason}
            </p>
          </div>

          {/* Notes */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-slate-500" />

              <h4 className="font-semibold text-slate-800">
                Notes
              </h4>
            </div>

            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              {appointment.notes || "No notes added."}
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default AppointmentDetailsDrawer;