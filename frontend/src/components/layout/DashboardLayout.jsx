// ===============================
// Imports
// ===============================

import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileBottomNav from "./MobileBottomNav";

// ===============================
// Component
// ===============================

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top Navigation */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex">

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Page Content */}
        <main className="flex-1 p-6 lg:ml-64">

          <Outlet />

        </main>

      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav />

    </div>
  );
};

// ===============================
// Export
// ===============================

export default DashboardLayout;