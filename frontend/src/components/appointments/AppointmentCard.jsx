import {
  CalendarDays,
  Clock3,
  Video,
  Building2,
  ChevronRight,
} from "lucide-react";

const statusColors = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-slate-100 text-slate-700",
};

const AppointmentCard = ({
  appointment,
  onView,
}) => {

  console.log(appointment);
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      {/* Top */}

      <div className="flex items-start gap-4">

        <div
          className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-blue-100
          "
      >
          👨‍⚕️
      </div>

        <div className="flex-1">

          <h3 className="font-semibold text-slate-800">
            {appointment.doctorName}
          </h3>

          <p className="text-sm text-sky-600">
            {appointment.specialization}
          </p>

        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusColors[appointment.status]}
          `}
        >
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          
        </span>

      </div>

      {/* Details */}

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-3 text-sm text-slate-600">

          <CalendarDays size={17} />

          {appointment.date}

        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">

          <Clock3 size={17} />

          {appointment.time}

        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">

          <Building2 size={17} />
                  
          {appointment.hospital}
                  
        </div>

      </div>

      {/* Footer */}

      <button
        onClick={() => onView(appointment)}
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-sky-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-sky-700
        "
      >
        View Details

        <ChevronRight size={18} />
      </button>

    </div>
  );
};

export default AppointmentCard;