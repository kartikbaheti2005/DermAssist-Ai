import {
  CalendarDays,
  FileText,
  HeartPulse,
  ScanSearch,
} from "lucide-react";

const iconMap = {
  report: FileText,
  prediction: ScanSearch,
  health: HeartPulse,
  appointment: CalendarDays,
};

const colorMap = {
  report: "bg-blue-100 text-blue-700",
  prediction: "bg-green-100 text-green-700",
  health: "bg-purple-100 text-purple-700",
  appointment: "bg-orange-100 text-orange-700",
};

const ContextChip = ({ type, label }) => {
  const Icon = iconMap[type] || FileText;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
        colorMap[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      <Icon size={14} />

      <span>{label}</span>
    </div>
  );
};

export default ContextChip;