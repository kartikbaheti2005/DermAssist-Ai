import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentForm = ({ doctor }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appointment_date: "",
    appointment_time: "",
    reason: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!doctor) return;

    const payload = {

        doctor_id: doctor.id,

        ...formData,

    };

    setLoading(true);

    setTimeout(() => {

        console.log("Appointment Payload:", payload);

        setLoading(false);

        setSuccess(true);

    }, 1200);

};

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Appointment Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {success && (

    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">

        <h3 className="font-semibold text-green-700">

            Appointment booked successfully!

        </h3>

        <p className="mt-1 text-sm text-green-600">

            Your appointment request has been submitted.

        </p>

        <button

            onClick={() => navigate("/appointments")}

            className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white"

        >

            View Appointments

        </button>

    </div>

)}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Date
          </label>

          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Time
          </label>

          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Reason
          </label>

          <textarea
            rows={3}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            placeholder="Briefly describe your skin concern..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 resize-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Additional Notes
          </label>

          <textarea
            rows={4}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information for the doctor..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!doctor || loading}
          className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading
            ? "Booking..."
            : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;