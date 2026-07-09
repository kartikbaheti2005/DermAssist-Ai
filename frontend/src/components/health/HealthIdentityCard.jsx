import {
  User,
  CalendarDays,
  Droplets,
  ShieldCheck,
} from "lucide-react";

const HealthIdentityCard = ({data}) => {

  const patient = {
    name: data?.name || "Kartik",
    patientId: `DA-${new Date().getFullYear()}-001`,
    age: data?.age,
    gender: data?.gender,
    bloodGroup: data?.bloodGroup,
    healthStatus: data?.healthStatus || "Healthy",
    lastScan: "2 Days Ago",
  };

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Top Row */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

            <User
              size={28}
              className="text-blue-600"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              {patient.name}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Patient ID : {patient.patientId}

            </p>

          </div>

        </div>

        <span
          className="
            rounded-full
            bg-green-100
            px-4
            py-2
            text-sm
            font-semibold
            text-green-700
          "
        >
          {patient.healthStatus}
        </span>

      </div>

      {/* Divider */}

      <div className="my-5 border-t border-slate-200" />

      {/* Medical Identity */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <InfoCard
          icon={<CalendarDays size={18} />}
          label="Age"
          value={`${patient.age} Years`}
        />

        <InfoCard
          icon={<ShieldCheck size={18} />}
          label="Gender"
          value={patient.gender}
        />

        <InfoCard
          icon={<Droplets size={18} />}
          label="Blood Group"
          value={patient.bloodGroup}
        />

        <InfoCard
          icon={<CalendarDays size={18} />}
          label="Last Scan"
          value={patient.lastScan}
        />

      </div>

    </div>

  );

};

const InfoCard = ({ icon, label, value }) => (

  <div className="rounded-2xl bg-slate-50 p-4">

    <div className="mb-2 flex items-center gap-2 text-blue-600">

      {icon}

      <span className="text-sm font-medium">

        {label}

      </span>

    </div>

    <p className="font-semibold text-slate-800">

      {value}

    </p>

  </div>

);

export default HealthIdentityCard;