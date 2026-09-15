import {
  Clock3,
  CheckCircle2,
  ClipboardCheck,
  CircleSlash,
} from "lucide-react";


const AppointmentStats = ({appointments = []}) => {
      const stats = [
      
          {
              title: "Confirmed",
              value: appointments.filter(
                  appointment =>
                      appointment.status === "confirmed"
              ).length,
      
              icon: CheckCircle2,
              iconBg: "bg-green-100",
              iconColor: "text-green-600",
          },
      
          {
              title: "Pending",
              value: appointments.filter(
                  appointment =>
                      appointment.status === "pending"
              ).length,
      
              icon: Clock3,
              iconBg: "bg-yellow-100",
              iconColor: "text-yellow-600",
          },
      
          {
              title: "Cancelled",
              value: appointments.filter(
                  appointment =>
                      appointment.status === "cancelled"
              ).length,
      
              icon: CircleSlash,
              iconBg: "bg-red-100",
              iconColor: "text-red-600",
          },
      
          {
              title: "Completed",
              value: appointments.filter(
                  appointment =>
                      appointment.status === "completed"
              ).length,
      
              icon: ClipboardCheck,
              iconBg: "bg-slate-100",
              iconColor: "text-slate-600",
          },
      
      ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon ?? ClipboardCheck;
        
        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>

            <h3 className="mt-5 text-3xl font-bold text-slate-800">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentStats;