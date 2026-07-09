import { FileSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyReportsState = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
        <FileSearch className="h-10 w-10 text-sky-600" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-800">
        No Reports Available
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        Your AI skin analysis reports will appear here after you complete
        a lesion scan.
      </p>

      <button
        onClick={() => navigate("/lesion-tracker")}
        className="
          mt-8
          rounded-xl
          bg-sky-600
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-sky-700
        "
      >
        Start Skin Analysis
      </button>
    </div>
  );
};

export default EmptyReportsState;