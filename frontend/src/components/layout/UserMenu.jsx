// ===============================
// Imports
// ===============================

import { ChevronDown, User } from "lucide-react";

// ===============================
// Component
// ===============================

const UserMenu = () => {

  // Temporary placeholder
  const user = {
    name: "Krish",
  };

  return (

    <button
      className="flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-slate-100"
    >

      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white"
      >
        <User size={20} />
      </div>

      <div className="hidden md:block text-left">

        <p className="text-sm font-semibold text-slate-800">
          {user.name}
        </p>

        <p className="text-xs text-slate-500">
          User
        </p>

      </div>

      <ChevronDown
        size={18}
        className="hidden md:block text-slate-500"
      />

    </button>

  );
};

// ===============================
// Export
// ===============================

export default UserMenu;
