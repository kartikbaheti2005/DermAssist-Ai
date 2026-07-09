// ===============================
// Imports
// ===============================

import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileBottomNav from "./MobileBottomNav";
import Breadcrumb from "./Breadcrumb";

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

            <div className="mx-auto max-w-7xl px-6 py-8">

                <Breadcrumb />

                <Outlet />

            </div>

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