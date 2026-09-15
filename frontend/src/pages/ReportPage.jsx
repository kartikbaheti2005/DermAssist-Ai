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

    const loadReports = async () => {

        try {
        
            const history =
                await getPredictions();
        
            const mapped = history.map((item) => ({

                id: item.id,
                        
                disease: item.predicted_label,
                        
                confidence: item.confidence_score,
                        
                risk: item.risk_level,
                        
                scanDate: new Date(
                    item.created_at
                ).toLocaleDateString(),
              
                image:
                    "https://placehold.co/600x400?text=Skin+Analysis",
              
                doctor: {
                
                    name: "DermAssist AI",
                
                    specialization: "AI Dermatology Copilot",
                
                },
              
                aiSummary:
                    item.predicted_label ===
                    "Model Not Connected"
              
                        ? "AI model integration is scheduled for Phase 6."
              
                        : `The AI detected ${item.predicted_label}.`,
              
                predictionId: item.id,
              
                raw: item,
              
            }));
              
            setReports(mapped);
              
        } catch (err) {
        
            console.error(err);
        
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