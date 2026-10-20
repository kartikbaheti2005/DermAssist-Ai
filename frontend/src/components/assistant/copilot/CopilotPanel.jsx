import AppointmentSummary from "./AppointmentSummary";
import HealthSnapshot from "./HealthSnapshot";
import PredictionSummary from "./PredictionSummary";
import ReportSummary from "./ReportSummary";
const CopilotPanel = ({ healthSnapshot, latestPrediction, latestReport, nextAppointment, contextLoading = false }) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-4"><h2 className="text-base font-semibold text-slate-900">Health context</h2><p className="mt-1 text-xs leading-5 text-slate-500">Relevant saved details are used when you send a message.</p></div>
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {contextLoading && <div className="h-24 animate-pulse rounded-xl bg-slate-100" aria-label="Loading patient context" />}
      <HealthSnapshot healthSnapshot={healthSnapshot} /><PredictionSummary latestPrediction={latestPrediction} /><ReportSummary latestReport={latestReport} /><AppointmentSummary nextAppointment={nextAppointment} />
    </div>
  </div>
);
export default CopilotPanel;
