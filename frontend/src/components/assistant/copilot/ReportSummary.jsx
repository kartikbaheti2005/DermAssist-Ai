import { ChevronRight, FileText } from "lucide-react";

const ReportSummary = ({ latestReport }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <FileText
          size={20}
          className="text-blue-600"
        />

        <h3 className="text-base font-semibold text-gray-900">
          Latest Report
        </h3>
      </div>

      {/* Report Information */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Report ID
          </span>

          <span className="font-medium text-gray-900">
            {latestReport.id}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Generated
          </span>

          <span className="font-medium text-gray-900">
            {latestReport.generatedOn}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Status
          </span>

          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            {latestReport.status}
          </span>
        </div>
      </div>

      {/* Action */}
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
        View Full Report
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default ReportSummary;