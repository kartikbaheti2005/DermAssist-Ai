import ReportHeader from "../components/reports/reportViewer/ReportHeader";
import PatientInfoCard from "../components/reports/reportViewer/PatientInfoCard";
import PredictionSummary from "../components/reports/reportViewer/PredictionSummary";
import SkinScanSection from "../components/reports/reportViewer/SkinScanSection";
import AIAnalysisSection from "../components/reports/reportViewer/AIAnalysisSection";
import RecommendationSection from "../components/reports/reportViewer/RecommendationSection";
import HealthHistorySection from "../components/reports/reportViewer/HealthHistorySection";
import ReportTimeline from "../components/reports/reportViewer/ReportTimeline";
import ReportActions from "../components/reports/reportViewer/ReportActions";
import ReportDisclaimer from "../components/reports/reportViewer/ReportDisclaimer";

const ReportViewerPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ReportHeader />

      <PatientInfoCard />

      <PredictionSummary />

      <SkinScanSection />

      <AIAnalysisSection />

      <RecommendationSection />

      <HealthHistorySection />

      <ReportTimeline />

      <ReportActions />

      <ReportDisclaimer />
    </div>
  );
};

export default ReportViewerPage;