const mockAppointment = {
  doctorName: "Dr. Aryan Kapur",
  specialization: "Cosmetic Dermatology",
  hospital: "DermaCare Centre",
  date: "26 June 2026",
  time: "11:00 AM",
  status: "Confirmed",
};

const NextAppointmentBanner = ({appointments = [], onView,}) => {
  const appointment = appointments.filter(
              appointment =>
                  appointment.status ===
                  "confirmed"
          )

          .sort((a, b) => {

              const first =
                  new Date(
                      `${a.date} ${a.time}`
                  );

              const second =
                  new Date(
                      `${b.date} ${b.time}`
                  );

              return first - second;

          })[0];

  if (!appointment) return null;

  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-sky-600">
            Next Appointment
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {appointment.doctorName}
          </h2>

          <p className="mt-1 text-slate-600">
            {appointment.specialization}
          </p>

          <p className="mt-1 text-slate-500">
            {appointment.hospital}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <span>📅 {appointment.date}</span>
            <span>🕒 {appointment.time}</span>
            <span className="font-medium text-green-600">
              {appointment.status}
            </span>
          </div>
        </div>

       <button
            onClick={() => {
                console.log("Banner clicked");
                console.log(appointment);
            
                onView?.(appointment);
            }}
            className="rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
            View Details
        </button>
      </div>
    </div>
  );
};

export default NextAppointmentBanner;