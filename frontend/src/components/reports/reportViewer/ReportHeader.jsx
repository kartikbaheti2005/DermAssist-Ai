import { ArrowLeft, CalendarDays, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import RiskBadge from "../RiskBadge";

const ReportHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />

          Back
        </button>

        <RiskBadge risk="Low" />

      </div>

      {/* Title */}

      <div className="mt-6">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-sky-100 p-3">

            <FileText className="h-7 w-7 text-sky-600" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              AI Skin Health Report
            </h1>

            <p className="mt-1 text-slate-500">
              Comprehensive AI-generated skin analysis report.
            </p>

          </div>

        </div>

      </div>

      {/* Report Meta */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Report ID
          </p>

          <h3 className="mt-2 font-semibold text-slate-800">
            RPT-2026-001
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Generated On
          </p>

          <div className="mt-2 flex items-center gap-2">

            <CalendarDays className="h-4 w-4 text-slate-500" />

            <span className="font-medium">
              26 June 2026
            </span>

          </div>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            AI Confidence
          </p>

          <h3 className="mt-2 text-xl font-bold text-sky-600">
            98.4%
          </h3>

        </div>

      </div>

    </section>
  );
};

export default ReportHeader;