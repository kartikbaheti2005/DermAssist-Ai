import { useLocation, Navigate } from "react-router-dom";

import AppointmentSummary from "../components/appointments/AppointmentSummary";
import AppointmentForm from "../components/appointments/AppointmentForm";

const AppointmentBookingPage = () => {
  const { state } = useLocation();

  const doctor = state?.doctor;

  // Prevent direct access without selecting a doctor
  if (!doctor) {
    return <Navigate to="/doctors" replace />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="-mt-2">
        <h1 className="text-3xl font-bold text-slate-800">
          Book an Appointment
        </h1>

        <p className="mt-2 text-slate-500">
          Complete the form below to request an appointment with your selected
          dermatologist.
        </p>
      </div>

      {/* Booking Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Doctor Summary */}
        <div className="lg:col-span-1">
          <AppointmentSummary doctor={doctor} />
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <AppointmentForm doctor={doctor} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;