import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment, getAvailableSlots } from "../../api/appointmentApi";

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
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [slotError, setSlotError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let active = true;
    setAvailableSlots([]);
    setSlotError("");
    if (!doctor?.id || !formData.appointment_date) return () => { active = false; };
    setSlotLoading(true);
    getAvailableSlots(doctor.id, formData.appointment_date)
      .then((result) => { if (active) setAvailableSlots(result.slots || []); })
      .catch((error) => {
        if (active) setSlotError(error?.response?.data?.detail || "Available times could not be loaded.");
      })
      .finally(() => { if (active) setSlotLoading(false); });
    return () => { active = false; };
  }, [doctor?.id, formData.appointment_date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!doctor) return;

    const payload = {

        doctor_id: doctor.id,

        ...formData,

    };

    setLoading(true);

    setSuccess(false);
    setSubmitError("");

    try {

        await createAppointment(payload);

        setSuccess(true);

    } catch (error) {

        console.error(error);

        setSubmitError(error?.response?.data?.detail || "Failed to book appointment.");

    } finally {

        setLoading(false);

    }

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
        {submitError && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{submitError}</p>}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Date
          </label>

          <input
            type="date"
            name="appointment_date"
            min={new Date().toISOString().slice(0, 10)}
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

          <select
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
            disabled={!formData.appointment_date || slotLoading || availableSlots.filter((slot) => slot.available).length === 0}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 disabled:bg-slate-100"
          >
            <option value="">{slotLoading ? "Loading available times…" : !formData.appointment_date ? "Select a date first" : "Choose an available time"}</option>
            {availableSlots.filter((slot) => slot.available).map((slot) => <option key={slot.time} value={slot.time}>{slot.time}</option>)}
          </select>
          {slotError && <div role="alert" className="mt-2 text-sm text-rose-700">{slotError} Choose another date to retry.</div>}
          {!slotLoading && formData.appointment_date && !slotError && availableSlots.length === 0 && <p className="mt-2 text-sm text-slate-600">No appointment times are listed for this doctor.</p>}
          {!slotLoading && formData.appointment_date && !slotError && availableSlots.length > 0 && availableSlots.every((slot) => !slot.available) && <p className="mt-2 text-sm text-slate-600">No times are available on this date. Choose another day.</p>}
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
          disabled={!doctor || loading || slotLoading || !formData.appointment_time}
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
