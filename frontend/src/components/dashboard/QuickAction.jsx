// ===============================
// Imports
// ===============================

import {
  Camera,
  Stethoscope,
  FileHeart,
  Bot,
} from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

// ===============================
// Quick Action Items
// ===============================

const actions = [
  {
    title: "Scan Skin",
    description: "Upload a lesion image",
    icon: Camera,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Find Doctor",
    description: "Search specialists",
    icon: Stethoscope,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Health Records",
    description: "View your health history",
    icon: FileHeart,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "AI Assistant",
    description: "Coming Soon",
    icon: Bot,
    color: "bg-orange-100 text-orange-600",
  },
];

// ===============================
// Component
// ===============================

const QuickActions = () => {
  return (
    <div>

      <SectionHeader
        title="Quick Actions"
        subtitle="Start your most common tasks"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (

            <Card
              key={action.title}
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex flex-col gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
                >
                  <Icon size={28} />
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {action.description}
                  </p>

                </div>

              </div>

            </Card>

          );
        })}

      </div>

    </div>
  );
};

// ===============================
// Export
// ===============================

export default QuickActions;