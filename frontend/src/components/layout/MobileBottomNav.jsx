// ===============================
// Imports
// ===============================

import {
  Home,
  ScanLine,
  Stethoscope,
  BarChart3,
  User,
} from "lucide-react";

// ===============================
// Navigation Items
// ===============================

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Scan",
    icon: ScanLine,
    path: "/lesion-tracker",
  },
  {
    title: "Doctors",
    icon: Stethoscope,
    path: "/health-records",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports"
  },
  {
    title: "Profile",
    icon: User,
    path: "/"
  },
];

// ===============================
// Component
// ===============================

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg lg:hidden">

      <div className="flex items-center justify-around py-2">

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-slate-600 transition-all duration-200 hover:text-blue-600"
            >
              <Icon size={22} />

              <span className="text-xs">
                {item.title}
              </span>
            </button>
          );
        })}

      </div>

    </nav>
  );
};

// ===============================
// Export
// ===============================

export default MobileBottomNav;