// ===============================
// Imports
// ===============================

import {
  HeartPulse,
  Droplets,
  Ruler,
  Weight,
  CalendarClock,
  ArrowRight,
} from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

// ===============================
// Component
// ===============================

const HealthCard = () => {

  // Temporary Data
  const health = {
    bmi: "23.4",
    bloodGroup: "B+",
    height: "174 cm",
    weight: "68 kg",
    updated: "Today",
  };

  return (

    <Card className="h-full">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Health Snapshot
          </h2>

          <p className="text-sm text-slate-500">
            Your latest health overview
          </p>

        </div>

        <HeartPulse
          size={30}
          className="text-red-500"
        />

      </div>

      {/* Health Information */}

      <div className="grid grid-cols-2 gap-5">

        <HealthItem
          icon={<HeartPulse size={18} />}
          title="BMI"
          value={health.bmi}
        />

        <HealthItem
          icon={<Droplets size={18} />}
          title="Blood Group"
          value={health.bloodGroup}
        />

        <HealthItem
          icon={<Ruler size={18} />}
          title="Height"
          value={health.height}
        />

        <HealthItem
          icon={<Weight size={18} />}
          title="Weight"
          value={health.weight}
        />

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t pt-5">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <CalendarClock size={18} />

          Updated {health.updated}

        </div>

        <Button className="flex items-center gap-2">

          View

          <ArrowRight size={16} />

        </Button>

      </div>

    </Card>

  );

};

// ===============================
// Small Reusable Item
// ===============================

const HealthItem = ({
  icon,
  title,
  value,
}) => {

  return (

    <div className="rounded-xl bg-slate-50 p-4">

      <div className="mb-3 text-blue-600">

        {icon}

      </div>

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h3 className="mt-1 text-lg font-semibold text-slate-800">

        {value}

      </h3>

    </div>

  );

};

// ===============================
// Export
// ===============================

export default HealthCard;