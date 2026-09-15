import {
  Activity,
  CalendarDays,
  FileText,
  ScanSearch,
} from "lucide-react";

const iconMap = {
  activity: Activity,
  calendar: CalendarDays,
  scan: ScanSearch,
  report: FileText,
};

const QuickActions = ({ actions, onActionClick }) => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] || FileText;

          return (
            <button
              key={action.action}
              onClick={() => onActionClick?.(action)}
              className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
                {Icon && <Icon size={24} />}
              </div>

              <span className="text-sm font-medium text-gray-800">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;