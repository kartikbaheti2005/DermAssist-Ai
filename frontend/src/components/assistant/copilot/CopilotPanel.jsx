import AppointmentSummary from "./AppointmentSummary";
import HealthSnapshot from "./HealthSnapshot";
import PredictionSummary from "./PredictionSummary";
import ReportSummary from "./ReportSummary";

const CopilotPanel = ({
  healthSnapshot,
  latestPrediction,
  latestReport,
  nextAppointment,
}) => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Medical Context
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Personalized insights for the current conversation.
        </p>
      </div>

      {/* Context Cards */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <HealthSnapshot healthSnapshot={healthSnapshot} />

        <PredictionSummary latestPrediction={latestPrediction} />

        <ReportSummary latestReport={latestReport} />

        <AppointmentSummary nextAppointment={nextAppointment} />
      </div>
    </div>
  );
};

export default CopilotPanel;