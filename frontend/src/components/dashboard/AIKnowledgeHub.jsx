// ======================================
// Imports
// ======================================

import { useState } from "react";
import Card from "../common/Card";
import { diseaseData } from "../../utils/diseaseData";

// ======================================
// Component
// ======================================
const AIKnowledgeHub = () => {
    const [selectedDisease, setSelectedDisease] = useState(diseaseData[0]);
    const [hoveredDisease, setHoveredDisease] = useState(null);

const orbitRadius = 155;

const positions = diseaseData.map((_, index) => {

    const angle = ((360 / diseaseData.length) * index - 90) * (Math.PI / 180);

    return {

        left: 210 + orbitRadius * Math.cos(angle),

        top: 210 + orbitRadius * Math.sin(angle),

    };

});

  return (
    <Card>

      {/* Header */}

      <div className="mb-8 text-center">

        <h2 className="text-3xl font-bold text-slate-800">
          AI Knowledge Hub
        </h2>

        <p className="mt-2 text-slate-500">
          Explore skin diseases recognized by DermAssist AI
        </p>

      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

        {/* Orbit Area */}

        <div className="flex items-center justify-center">

          <div className="relative h-[420px] w-[420px]">

            {/* Orbit Ring */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[320px]
                w-[320px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border-2
                border-dashed
                border-slate-300
              "
            />

            {/* AI Core */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-36
                w-36
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-cyan-500
                text-center
                text-white
                shadow-2xl
              "
            >

              <h3 className="mt-2 font-bold">
                DermAssist AI
              </h3>

              <p className="text-xs opacity-90">
                Diagnostic Engine
              </p>

            </div>

            {/* Disease Nodes */}

            {diseaseData.map((disease, index) => (

                <button
                key={disease.id}
                onMouseEnter={() => {
                  setHoveredDisease(disease);
                  setSelectedDisease(disease);
                }}
                onMouseLeave={() => {
                  setHoveredDisease(null);
                }}
                className={`
                  absolute
                  flex
                  flex-col
                  items-center
                  justify-center
              
                  h-16
                  w-16
              
                  -translate-x-1/2
                  -translate-y-1/2
              
                  rounded-2xl
              
                  bg-gradient-to-br
                  ${disease.gradient}
              
                  text-white
              
                  border
                  border-white/30
              
                  shadow-lg
              
                  transition-all
                  duration-300
              
                  ${
                    hoveredDisease?.id === disease.id
                      ? "scale-110 shadow-2xl"
                      : "scale-100 shadow-lg"
                  }
                `}
                style={{
                  left: `${positions[index].left}px`,
                  top: `${positions[index].top}px`,
                }}
              >
                {disease.short}
              </button>

            ))}

          </div>

        </div>

        {/* Information Panel */}

        <div className="rounded-2xl border border-slate-200 p-6">

          <h3 className="text-3xl font-bold text-slate-800">
            {selectedDisease.name}
          </h3>

          <span
            className={`
              mt-4
              inline-flex
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              ${
                selectedDisease.risk.includes("High")
                  ? "bg-red-500"
                  : selectedDisease.risk.includes("Medium")
                  ? "bg-orange-500"
                  : selectedDisease.risk.includes("Pre")
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }
            `}
          >
            {selectedDisease.risk}
          </span>

          <div className="mt-6">

            <h4 className="font-semibold text-slate-700">
              Description
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              {selectedDisease.description}
            </p>

          </div>

          <div className="mt-6">

            <h4 className="font-semibold text-slate-700">
              Common Symptoms
            </h4>

            <p className="mt-2 leading-7 text-slate-600">
              {selectedDisease.symptoms}
            </p>

          </div>

        </div>

      </div>

    </Card>
  );
};

export default AIKnowledgeHub;