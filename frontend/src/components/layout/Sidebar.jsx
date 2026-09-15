// ===============================
// Imports
// ===============================
import { NavLink } from "react-router-dom";

import {
  Home,
  ScanLine,
  HeartPulse,
  Stethoscope,
  CalendarDays,
  BarChart3,
  Bot,
  Globe2,
  Settings,
  UsersRound
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
    title: "Health",
    icon: HeartPulse,
    path: "/health-records",
  },
  {
    title: "Doctors",
    icon: Stethoscope,
    path: "/doctors",
  },
  {
    title: "Appointments",
    icon: CalendarDays,
    path: "/appointments",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    path: "/assistant",
  },
  {
    title: "Patient Queue",
    icon: UsersRound,
    path: "/queue",
}
];

// ===============================
// Component
// ===============================

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 flex-col border-r border-slate-200 bg-white">

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                
                  <Icon size={20} />
                
                  <span className="font-medium">
                    {item.title}
                  </span>
                
                </NavLink>
                
              </li>
            );
          })}

        </ul>

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">

        <button
          className="flex items-center w-full gap-3 rounded-xl px-4 py-3 text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
        >

          <Settings size={20} />

          <span className="font-medium">
            Settings
          </span>

        </button>

      </div>

    </aside>
  );
};

// ===============================
// Export
// ===============================

export default Sidebar;