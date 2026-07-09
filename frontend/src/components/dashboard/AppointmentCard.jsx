// =====================================
// Imports
// =====================================

import {
  CalendarDays,
  Clock3,
  UserRound,
  ArrowRight,
} from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

// =====================================
// Temporary Data
// =====================================

const appointment = {
  doctor: "Dr. Sarah Johnson",
  speciality: "Dermatologist",
  date: "28 June 2026",
  time: "10:30 AM",
};

// =====================================
// Component
// =====================================

const AppointmentCard = () => {

  return (

    <Card className="h-full">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">

            Upcoming Appointment

          </h2>

          <p className="text-sm text-slate-500">

            Your next consultation

          </p>

        </div>

        <CalendarDays
          className="text-violet-600"
          size={30}
        />

      </div>

      {/* Doctor */}

      <div className="rounded-xl border border-slate-200 p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-blue-100 p-3">

            <UserRound
              size={22}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="font-semibold text-slate-800">

              {appointment.doctor}

            </h3>

            <p className="text-sm text-slate-500">

              {appointment.speciality}

            </p>

          </div>

        </div>

      </div>

      {/* Date */}

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">

            Date

          </p>

          <h3 className="mt-2 font-semibold">

            {appointment.date}

          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2">

            <Clock3
              size={18}
              className="text-slate-500"
            />

            <span className="text-sm text-slate-500">

              Time

            </span>

          </div>

          <h3 className="mt-2 font-semibold">

            {appointment.time}

          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6">

        <Button
          className="flex w-full items-center justify-center gap-2"
        >

          View Appointment

          <ArrowRight size={18} />

        </Button>

      </div>

    </Card>

  );

};

export default AppointmentCard;