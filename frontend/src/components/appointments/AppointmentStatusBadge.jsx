const STATUS_STYLES = {
  Upcoming: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-slate-100 text-slate-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AppointmentStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default AppointmentStatusBadge;