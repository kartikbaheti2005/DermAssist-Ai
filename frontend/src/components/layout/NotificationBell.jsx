// ===============================
// Imports
// ===============================

import { Bell } from "lucide-react";

// ===============================
// Component
// ===============================

const NotificationBell = () => {

  // Temporary placeholder
  const notificationCount = 0;

  return (

    <button
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600"
    >

      <Bell size={22} />

      {notificationCount > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white"
        >
          {notificationCount}
        </span>
      )}

    </button>

  );
};

// ===============================
// Export
// ===============================

export default NotificationBell;