import { X, Brain, UserRound, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

import RiskBadge from "./RiskBadge";
import DownloadButton from "./DownloadButton";

const ReportPreviewDrawer = ({
  report,
  open,
  onClose,
}) => {
  if (!open || !report) return null;
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              AI Report Preview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quick overview of your latest skin analysis.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          <img
            src={report.image}
            alt={report.disease}
            className="h-56 w-full rounded-2xl object-cover"
          />

          <div>

            <h3 className="text-2xl font-bold text-slate-800">
              {report.disease}
            </h3>

            <div className="mt-3 flex items-center justify-between">

              <RiskBadge risk={report.risk} />

              <div className="flex items-center gap-2 text-slate-600">

                <Percent className="h-4 w-4" />

                {report.confidence}%

              </div>

            </div>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="mb-2 flex items-center gap-2">

              <UserRound className="h-5 w-5 text-slate-500" />

              <span className="font-semibold">
                Dermatologist
              </span>

            </div>

            <p>{report.doctor.name}</p>

            <p className="text-sm text-slate-500">
              {report.doctor.specialization}
            </p>

          </div>

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Brain className="h-5 w-5 text-slate-500" />

              <span className="font-semibold">
                AI Summary
              </span>

            </div>

            <p className="text-sm leading-6 text-slate-600">
              {report.aiSummary}
            </p>

          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">

            <button
              onClick={() => {
                onClose();
                navigate(`/reports/${report.id}`);
              }}
              className="w-full rounded-xl bg-sky-600 py-3 font-medium text-white transition hover:bg-sky-700"
            >
              Open Full Report
            </button>
          
            <DownloadButton report={report} />
          
          </div>

        </div>

      </div>

    </>
  );
};

export default ReportPreviewDrawer;