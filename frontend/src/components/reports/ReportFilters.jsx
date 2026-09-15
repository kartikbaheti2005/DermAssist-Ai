import { Search } from "lucide-react";

const ReportFilters = () => {
  const filters = [
    "All",
    "Recent",
    "High Risk",
    "Medium Risk",
    "Low Risk",
    "Saved",
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search reports..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-12
            pr-4
            outline-none
            transition
            focus:border-sky-500
            focus:ring-2
            focus:ring-sky-100
          "
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              ${
                index === 0
                  ? "bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportFilters;