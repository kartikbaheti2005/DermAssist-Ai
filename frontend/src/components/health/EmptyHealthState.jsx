import {
  ClipboardPlus,
  ShieldCheck,
  ScanSearch,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

const benefits = [
  "Personalized AI skin analysis",
  "Better health recommendations",
  "Doctor consultation support",
  "Health history tracking",
];

const EmptyHealthState = ({ onCreate }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      <div className="mx-auto max-w-3xl text-center">

        {/* Icon */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

          <ClipboardPlus
            size={42}
            className="text-blue-600"
          />

        </div>

        {/* Heading */}

        <h2 className="mt-8 text-3xl font-bold text-slate-800">
          Set Up Your Health Profile
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
          Complete your health profile once to unlock personalized
          recommendations, smarter AI analysis and better medical insights.
        </p>

        {/* Benefits */}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">

          <Benefit
            icon={<ScanSearch size={20} />}
            text={benefits[0]}
          />

          <Benefit
            icon={<ShieldCheck size={20} />}
            text={benefits[1]}
          />

          <Benefit
            icon={<Stethoscope size={20} />}
            text={benefits[2]}
          />

          <Benefit
            icon={<ClipboardPlus size={20} />}
            text={benefits[3]}
          />

        </div>

        {/* Button */}

        <button
          onClick={onCreate}
          className="
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-7
            py-4
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >

          Set Up Health Profile

          <ChevronRight size={20} />

        </button>

      </div>

    </div>
  );
};

const Benefit = ({ icon, text }) => (
  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-left">

    <div className="text-blue-600">

      {icon}

    </div>

    <span className="font-medium text-slate-700">

      {text}

    </span>

  </div>
);

export default EmptyHealthState;