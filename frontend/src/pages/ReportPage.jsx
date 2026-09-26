import { useEffect, useState } from "react";
import { getPredictions } from "../api/predictionApi";

import ReportStats from "../components/reports/ReportStats";
import ReportFilters from "../components/reports/ReportFilters";
import ReportList from "../components/reports/ReportList";
import ReportPreviewDrawer from "../components/reports/ReportPreviewDrawer";

const ReportPage = () => {
    const [reports, setReports] = useState([]);

    const [selectedReport, setSelectedReport] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const loadReports = async () => {

        try {
        
            const history =
                await getPredictions();
        
            const mapped = history.map((item) => ({

                id: item.id,
                        
                disease: item.predicted_label,
                        
                confidence: Number(item.confidence_score) <= 1 ? Number(item.confidence_score) * 100 : Number(item.confidence_score),
                        
                risk: item.risk_level,
                        
                scanDate: new Date(
                    item.created_at
                ).toLocaleDateString(),
              
                predictionId: item.id,
              
                raw: item,
              
            }));
              
            setReports(mapped);
              
        } catch (err) {
        
            console.error(err);
            setLoadError("Reports could not be loaded. Please try again.");
        } finally {
            setLoading(false);
        
        }
      
      };

      useEffect(() => {

          loadReports();

      }, []);

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
      <ReportFilters query={query} onQueryChange={setQuery} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Report List */}
      {loading ? <p className="py-8 text-center text-slate-500">Loading reports…</p> : loadError ? <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">{loadError}<button onClick={loadReports} className="ml-3 font-semibold underline">Retry</button></div> : <ReportList
        reports={reports.filter((report) => {
          const matchesQuery = `${report.disease} ${report.id}`.toLowerCase().includes(query.toLowerCase());
          const risk = (report.risk || "").toLowerCase();
          const isRecent = report.raw?.created_at && Date.now() - new Date(report.raw.created_at).getTime() <= 30 * 24 * 60 * 60 * 1000;
          const matchesRisk = activeFilter === "All" || (activeFilter === "Recent" && isRecent) || risk === activeFilter.toLowerCase().replace(" risk", "");
          return matchesQuery && matchesRisk;
        })}
        onSelect={(report) => {
          setSelectedReport(report);
          setDrawerOpen(true);
        }}
      />}
       
       <ReportPreviewDrawer
          report={selectedReport}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
    </div>
  );
};

export default ReportPage;
