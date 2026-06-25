// ===============================
// Component
// ===============================

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
}) => {

  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors[color]}`}
        >
          <Icon size={28} />
        </div>

      </div>

    </div>

  );

};

// ===============================
// Export
// ===============================

export default StatsCard;