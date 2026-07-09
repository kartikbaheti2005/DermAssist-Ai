import { UserRoundSearch } from "lucide-react";

const EmptyDoctorsState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">

        <UserRoundSearch
          size={38}
          className="text-sky-600"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        No Doctors Found
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        We couldn't find any dermatologists matching your search or selected
        filters. Try changing your search criteria.
      </p>

      <button
        onClick={onReset}
        className="
          mt-8
          rounded-xl
          bg-sky-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-sky-700
        "
      >
        Reset Filters
      </button>

    </div>
  );
};

export default EmptyDoctorsState;