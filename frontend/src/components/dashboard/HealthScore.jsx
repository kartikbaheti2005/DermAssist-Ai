// =====================================
// Imports
// =====================================

import { TrendingUp } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

// =====================================
// Temporary Data
// =====================================

const health = {
  score: 92,
  status: "Excellent",
  change: "+4%",
  description:
    "Your skin health looks good. Continue regular monitoring and sun protection.",
};

// =====================================
// Component
// =====================================

const HealthScore = () => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress =
    circumference - (health.score / 100) * circumference;

  return (
    <Card className="h-full">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Health Score
        </h2>

        <p className="text-sm text-slate-500">
          Overall Skin Health
        </p>

      </div>

      {/* Circular Score */}

      <div className="flex justify-center">

        <div className="relative h-44 w-44">

          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 180 180"
          >

            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#2563EB"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-5xl font-bold text-slate-800">
              {health.score}
            </span>

            <span className="text-sm text-slate-500">
              /100
            </span>

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="mt-6 text-center">

        <h3 className="text-lg font-semibold text-green-600">
          {health.status}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {health.description}
        </p>

      </div>

      {/* Trend */}

      <div className="mt-6 flex items-center justify-between rounded-xl bg-green-50 p-4">

        <div className="flex items-center gap-2">

          <TrendingUp
            size={20}
            className="text-green-600"
          />

          <span className="text-slate-600">
            Since Last Scan
          </span>

        </div>

        <span className="font-bold text-green-600">
          {health.change}
        </span>

      </div>

      {/* Footer */}

      <div className="mt-6">

        <Button className="w-full">

          View Full Report

        </Button>

      </div>

    </Card>
  );
};

export default HealthScore;