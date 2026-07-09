const AppointmentSummary = ({ doctor }) => {
  if (!doctor) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No Doctor Selected
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Please return to the Doctors page and select a doctor to book an
          appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Doctor Summary
      </h2>

      <div className="mt-6 flex flex-col items-center text-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-28 w-28 rounded-full object-cover border-4 border-sky-100"
        />

        <h3 className="mt-4 text-xl font-bold text-slate-800">
          {doctor.name}
        </h3>

        <p className="text-sky-600 font-medium">
          {doctor.specialization}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <InfoRow label="Qualification" value={doctor.qualification} />
        <InfoRow label="Experience" value={doctor.experience} />
        <InfoRow label="Hospital" value={doctor.hospital} />
        <InfoRow label="Location" value={doctor.location} />
        <InfoRow
          label="Consultation Fee"
          value={`₹${doctor.consultationFee}`}
        />
        <InfoRow label="Availability" value={doctor.availability} />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
    <span className="text-sm text-slate-500">
      {label}
    </span>

    <span className="text-right font-medium text-slate-800">
      {value}
    </span>
  </div>
);

export default AppointmentSummary;