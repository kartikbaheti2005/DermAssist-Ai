import { useState } from "react";
import { diseaseData } from "../../utils/diseaseData";

const positions = [
  { top: "5%", left: "50%" },
  { top: "20%", left: "82%" },
  { top: "50%", left: "92%" },
  { top: "80%", left: "76%" },
  { top: "90%", left: "50%" },
  { top: "78%", left: "18%" },
  { top: "35%", left: "8%" },
];

const SevenClassesOrbit = () => {
  const [selected, setSelected] = useState(diseaseData[0]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          AI Prediction Classes
        </h2>

        <p className="mt-2 text-slate-500">
          DermAssist AI currently classifies seven major skin lesion categories.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* Orbit */}

        <div className="flex items-center justify-center">

          <div className="relative h-[420px] w-[420px]">

            {/* Orbit Ring */}

            <div className="absolute inset-8 rounded-full border-2 border-dashed border-slate-300" />

            {/* Center */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-32
                w-32
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-cyan-500
                text-white
                shadow-xl
              "
            >
              <div className="text-3xl">
                🧠
              </div>

              <p className="mt-2 text-sm font-semibold">
                DermAssist AI
              </p>
            </div>

            {/* Nodes */}

            {diseaseData.map((item, index) => (

              <button
                key={item.id}
                onMouseEnter={() => setSelected(item)}
                className={`
                  absolute
                  flex
                  h-14
                  w-14
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  ${item.gradient}
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  duration-300
                  hover:scale-110
                `}
                style={{
                  top: positions[index].top,
                  left: positions[index].left,
                }}
              >
                {item.short}
              </button>

            ))}

          </div>

        </div>

        {/* Information */}

        <div>

          <div className="rounded-2xl bg-slate-50 p-6">

            <h3 className="text-2xl font-bold text-slate-800">
              {selected.name}
            </h3>

            <span
              className={`${selected.riskColor} mt-4 inline-block rounded-full px-3 py-1 text-sm font-semibold text-white`}
            >
              {selected.risk}
            </span>

            <div className="mt-6">

              <h4 className="font-semibold text-slate-700">
                Description
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                {selected.description}
              </p>

            </div>

            <div className="mt-6">

              <h4 className="font-semibold text-slate-700">
                Symptoms
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                {selected.symptoms}
              </p>

            </div>

            <div className="mt-6">

              <h4 className="font-semibold text-slate-700">
                Recommendation
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                {selected.recommendation}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SevenClassesOrbit;