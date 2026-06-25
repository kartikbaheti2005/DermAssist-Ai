// ===============================
// Imports
// ===============================

import { Search } from "lucide-react";

import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

// ===============================
// Component
// ===============================

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

      <div className="flex items-center justify-between h-16 px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-lg">
            D
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              DermAssist AI
            </h1>

            <p className="text-xs text-slate-500">
              AI-Powered Skin Health Platform
            </p>
          </div>

        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full max-w-md mx-10">

          <div className="relative w-full">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          <NotificationBell />

          <UserMenu />

        </div>

      </div>

    </header>
  );
};

// ===============================
// Export
// ===============================

export default Navbar;