import { useState } from "react";

const FILTERS = [
  "All",
  "Upcoming",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const AppointmentFilters = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex flex-wrap gap-3">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => setActiveFilter(filter)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeFilter === filter
              ? "bg-sky-600 text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default AppointmentFilters;