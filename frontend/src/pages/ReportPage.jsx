import { useState } from "react";

import { reports } from "../data/reports";

import ReportStats from "../components/reports/ReportStats";
import ReportFilters from "../components/reports/ReportFilters";
import ReportList from "../components/reports/ReportList";
import ReportPreviewDrawer from "../components/reports/ReportPreviewDrawer";

const ReportPage = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="-mt-2">
        <h1 className="text-3xl font-bold text-slate-800">
          AI Skin Reports
        </h1>

        <p className="mt-2 text-slate-500">
          View, manage and download your AI-generated skin analysis reports.
        </p>
      </div>

      {/* Statistics */}
      <ReportStats />

      {/* Filters */}
      <ReportFilters />

      {/* Report List */}
      <ReportList
          reports={reports}
          onSelect={(report) => {
            setSelectedReport(report);
            setDrawerOpen(true);
          }}
        />
       
       <ReportPreviewDrawer
          report={selectedReport}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
    </div>
  );
};

export default ReportPage;