import { CalendarX, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyAppointmentState = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-14 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
        <CalendarX className="h-10 w-10 text-sky-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        No Appointments Yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        You haven't booked any dermatology consultations yet.
        Start by finding a dermatologist and schedule your first appointment.
      </p>

      <button
        onClick={() => navigate("/doctors")}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
      >
        Find Dermatologists

        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default EmptyAppointmentState;