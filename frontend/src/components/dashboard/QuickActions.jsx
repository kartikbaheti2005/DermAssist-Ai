import { Link } from "react-router-dom";
import { Camera, Stethoscope, FileHeart, Bot, ArrowUpRight } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

const actions = [
  {
    title: "Scan Skin",
    description: "Upload a lesion image for AI analysis",
    icon: Camera,
    color: "bg-blue-100 text-blue-700",
    path: "/lesion-tracker",
  },
  {
    title: "Find a Doctor",
    description: "Explore dermatology specialists",
    icon: Stethoscope,
    color: "bg-emerald-100 text-emerald-700",
    path: "/doctors",
  },
  {
    title: "Health Records",
    description: "Review your health history",
    icon: FileHeart,
    color: "bg-violet-100 text-violet-700",
    path: "/health-records",
  },
  {
    title: "AI Assistant",
    description: "Ask about your skin health",
    icon: Bot,
    color: "bg-cyan-100 text-cyan-700",
    path: "/assistant",
  },
];

const QuickActions = () => (
  <section aria-labelledby="quick-actions-heading">
    <SectionHeader
      title="Quick Actions"
      subtitle="Pick up where you need help"
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map(({ title, description, icon: Icon, color, path }) => (
        <Link
          key={title}
          to={path}
          aria-label={`${title}: ${description}`}
          className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Card className="h-full border-slate-200/80 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-lg">
            <div className="flex h-full items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}>
                <Icon size={23} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-800">{title}</h3>
                  <ArrowUpRight size={16} className="text-slate-400 transition-colors group-hover:text-blue-600" aria-hidden="true" />
                </div>
                <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  </section>
);

export default QuickActions;
