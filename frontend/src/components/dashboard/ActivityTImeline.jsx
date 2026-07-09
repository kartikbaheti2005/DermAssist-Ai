// ===============================
// Imports
// ===============================

import {
  ScanSearch,
  CalendarCheck,
  FileHeart,
  Clock3,
} from "lucide-react";

import Card from "../common/Card";

// ===============================
// Temporary Activity Data
// ===============================

const activities = [
  {
    icon: ScanSearch,
    title: "Skin Scan Completed",
    description: "Prediction generated successfully",
    time: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booked",
    description: "Consultation scheduled",
    time: "Yesterday",
    color: "bg-green-500",
  },
  {
    icon: FileHeart,
    title: "Health Record Updated",
    description: "BMI information added",
    time: "3 days ago",
    color: "bg-purple-500",
  },
];

// ===============================
// Component
// ===============================

const ActivityTimeline = () => {
  return (

    <Card className="h-full">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500">
          Your latest actions
        </p>

      </div>

      {/* Timeline */}

      <div className="space-y-6">

        {activities.map((activity, index) => {

          const Icon = activity.icon;

          return (

            <div
              key={index}
              className="relative flex gap-4"
            >

              {/* Vertical Line */}

              {index !== activities.length - 1 && (

                <div
                  className="absolute left-5 top-10 h-full w-0.5 bg-slate-200"
                />

              )}

              {/* Icon */}

              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${activity.color} text-white`}
              >

                <Icon size={18} />

              </div>

              {/* Text */}

              <div className="flex-1">

                <h3 className="font-semibold text-slate-800">

                  {activity.title}

                </h3>

                <p className="text-sm text-slate-500">

                  {activity.description}

                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">

                  <Clock3 size={14} />

                  {activity.time}

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </Card>

  );
};

export default ActivityTimeline;