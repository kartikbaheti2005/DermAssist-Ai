import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

const DoctorFilters = ({
  search,
  setSearch,
  filters,
  setFilters,
  onReset,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search doctor, hospital or locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-sky-500
              focus:ring-2
              focus:ring-sky-100
            "
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-2 text-slate-500">

            <SlidersHorizontal size={18} />

            <span className="text-sm font-medium">
              Filters
            </span>

          </div>

          {/* Experience */}

          <select
            value={filters.experience}
            onChange={(e) =>
              setFilters({
                ...filters,
                experience: e.target.value,
              })
            }
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            <option value="">Experience</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
            <option value="15">15+ Years</option>
          </select>

          {/* Rating */}

          <select
            value={filters.rating}
            onChange={(e) =>
              setFilters({
                ...filters,
                rating: e.target.value,
              })
            }
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            <option value="">Rating</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
            <option value="5">5.0</option>
          </select>

          {/* Mode */}

          <select
            value={filters.mode}
            onChange={(e) =>
              setFilters({
                ...filters,
                mode: e.target.value,
              })
            }
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            <option value="">Consultation</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Online & Offline">
              Both
            </option>
          </select>

          {/* Reset */}

          <button
            onClick={onReset}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              px-4
              py-2
              text-sm
              transition
              hover:bg-slate-100
            "
          >
            <RotateCcw size={16} />

            Reset

          </button>

        </div>

      </div>

    </div>
  );
};

export default DoctorFilters;