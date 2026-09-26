// ===============================
// Imports
// ===============================

import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileBottomNav from "./MobileBottomNav";
import Breadcrumb from "./Breadcrumb";
import RouteTransition from "../common/RouteTransition";
import RouteLoading from "../common/RouteLoading";

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

                <RouteTransition><Suspense fallback={<RouteLoading />}><Outlet /></Suspense></RouteTransition>

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
