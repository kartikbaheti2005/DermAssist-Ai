// ======================================
// Imports
// ======================================

import {
  BrainCircuit,
  ShieldCheck,
  Sun,
  ArrowRight,
} from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

// ======================================
// Temporary Insight
// ======================================

const insight = {
  title: "Protect Your Skin Today",
  description:
    "High UV exposure is expected today. Wear SPF 50+, avoid prolonged sunlight and monitor any changing lesions.",
  confidence: "92%",
};

// ======================================
// Component
// ======================================

const AIInsightCard = () => {

  return (

    <Card className="h-full">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">

            AI Health Insight

          </h2>

          <p className="text-sm text-slate-500">

            Personalized recommendation

          </p>

        </div>

        <BrainCircuit
          size={32}
          className="text-violet-600"
        />

      </div>

      {/* Main Insight */}

      <div className="rounded-xl bg-violet-50 border border-violet-100 p-5">

        <div className="flex items-center gap-3">

          <Sun
            className="text-yellow-500"
            size={24}
          />

          <h3 className="font-semibold text-slate-800">

            {insight.title}

          </h3>

        </div>

        <p className="mt-4 leading-7 text-slate-600">

          {insight.description}

        </p>

      </div>

      {/* Confidence */}

      <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={22}
            className="text-green-600"
          />

          <span className="text-slate-600">

            Confidence

          </span>

        </div>

        <span className="text-lg font-bold text-green-600">

          {insight.confidence}

        </span>

      </div>

      {/* Footer */}

      <div className="mt-6">

        <Button
          className="flex w-full items-center justify-center gap-2"
        >

          Learn More

          <ArrowRight size={18} />

        </Button>

      </div>

    </Card>

  );

};

export default AIInsightCard;