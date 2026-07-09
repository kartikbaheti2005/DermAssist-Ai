const AppointmentSuccessModal = ({
  open,
  doctor,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">✓</span>
          </div>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-slate-800">
          Appointment Booked
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Your appointment request has been sent successfully.
        </p>

        {doctor && (
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">
              {doctor.name}
            </p>

            <p className="text-sm text-slate-500">
              {doctor.specialization}
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AppointmentSuccessModal;