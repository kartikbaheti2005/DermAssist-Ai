import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  IndianRupee,
  Calendar,
  Building2,
} from "lucide-react";

import RatingStars from "./RatingStars";

const DoctorDrawer = ({
  doctor,
  open,
  onClose,
  onBook,
}) => {
  if (!open || !doctor) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div
        className="
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-md
          flex-col
          overflow-y-auto
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Doctor Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 p-6">

          {/* Image */}

          <div className="flex flex-col items-center">

            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-28 w-28 rounded-full object-cover"
            />

            <h3 className="mt-4 text-xl font-bold">
              {doctor.name}
            </h3>

            <p className="text-sky-600">
              {doctor.specialization}
            </p>

            <div className="mt-2">
              <RatingStars
                rating={doctor.rating}
                reviews={doctor.reviews}
              />
            </div>

          </div>

          {/* Information */}

          <div className="mt-8 space-y-5">

            <Info
              icon={GraduationCap}
              label="Qualification"
              value={doctor.qualification}
            />

            <Info
              icon={Briefcase}
              label="Experience"
              value={`${doctor.experience} Years`}
            />

            <Info
              icon={Building2}
              label="Hospital"
              value={doctor.hospital}
            />

            <Info
              icon={MapPin}
              label="Location"
              value={`${doctor.area}, ${doctor.location}`}
            />

            <Info
              icon={Languages}
              label="Languages"
              value={doctor.languages.join(", ")}
            />

            <Info
              icon={IndianRupee}
              label="Consultation Fee"
              value={`₹${doctor.consultationFee}`}
            />

            <Info
              icon={Calendar}
              label="Availability"
              value={doctor.availability}
            />

          </div>

          {/* About */}

          <div className="mt-8">

            <h4 className="mb-2 text-lg font-semibold">
              About
            </h4>

            <p className="text-sm leading-7 text-slate-600">
              {doctor.about}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-5">

          <button
            onClick={() => onBook(doctor)}
            className="
              w-full
              rounded-xl
              bg-sky-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-sky-700
            "
          >
            Book Appointment
          </button>

        </div>

      </div>
    </>
  );
};

const Info = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3">

    <Icon
      size={20}
      className="mt-1 text-sky-600"
    />

    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-medium text-slate-800">
        {value}
      </p>

    </div>

  </div>
);

export default DoctorDrawer;