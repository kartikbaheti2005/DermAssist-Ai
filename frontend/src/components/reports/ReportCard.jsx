import {
  CalendarDays,
  Brain,
  ChevronRight,
  UserRound,
  Percent,
} from "lucide-react";

import RiskBadge from "./RiskBadge";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ report, onClick }) => {
    return (
    <button
      type="button"
      onClick={() => onClick?.(report)}
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-sky-300
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-5">

        {/* Left Section */}
        <div className="flex flex-1 gap-4">

          <img
            src={report.image}
            alt={report.disease}
            className="h-24 w-24 rounded-xl object-cover"
          />

          <div className="flex-1">

            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {report.id}
            </span>

            <h3 className="mt-1 text-lg font-semibold text-slate-800">
              {report.disease}
            </h3>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

              <div className="flex items-center gap-1">
                <Percent className="h-4 w-4" />
                {report.confidence}%
              </div>

              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {report.scanDate}
              </div>

            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <UserRound className="h-4 w-4" />
              {report.doctor.name}
            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end justify-between gap-4">

          <RiskBadge risk={report.risk} />

          <div className="flex items-center gap-2 text-sm font-medium text-sky-600">

            <Brain className="h-4 w-4" />

            View Report

            <ChevronRight className="h-4 w-4" />

          </div>

        </div>

      </div>
    </button>
  );
};

export default ReportCard;