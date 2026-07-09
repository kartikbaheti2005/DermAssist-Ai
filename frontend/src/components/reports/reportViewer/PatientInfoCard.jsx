import {
  User,
  Calendar,
  Phone,
  Mail,
  Droplets,
  BadgeCheck,
} from "lucide-react";

const PatientInfoCard = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-800">
        Patient Information
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Patient identity and report information.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <InfoItem
          icon={User}
          label="Patient Name"
          value="Krish Baheti"
        />

        <InfoItem
          icon={Calendar}
          label="Age"
          value="21 Years"
        />

        <InfoItem
          icon={BadgeCheck}
          label="Gender"
          value="Male"
        />

        <InfoItem
          icon={Droplets}
          label="Blood Group"
          value="O+"
        />

        <InfoItem
          icon={Phone}
          label="Phone"
          value="+91 XXXXX XXXXX"
        />

        <InfoItem
          icon={Mail}
          label="Email"
          value="krish@example.com"
        />

      </div>

    </section>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-sky-100 p-2">

          <Icon className="h-5 w-5 text-sky-600" />

        </div>

        <div>

          <p className="text-xs uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <h4 className="mt-1 font-semibold text-slate-800">
            {value}
          </h4>

        </div>

      </div>

    </div>
  );
};

export default PatientInfoCard;