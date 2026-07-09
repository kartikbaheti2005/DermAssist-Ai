import {
  MapPin,
  IndianRupee,
  Clock,
} from "lucide-react";

import RatingStars from "./RatingStars";

const DoctorCard = ({ doctor, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(doctor)}
      className="
        cursor-pointer
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-sky-400
        hover:shadow-lg
      "
    >
      {/* Doctor Image */}

      <div className="flex justify-center">

        <img
          src={doctor.image}
          alt={doctor.name}
          className="
            h-20
            w-20
            rounded-full
            object-cover
            border-2
            border-slate-100
          "
        />

      </div>

      {/* Name */}

      <div className="mt-3 text-center">

        <h3 className="line-clamp-1 text-base font-bold text-slate-800">
          {doctor.name}
        </h3>

        <p className="text-sm text-sky-600">
          {doctor.specialization}
        </p>

      </div>

      {/* Rating */}

      <div className="mt-3 flex justify-center">

        <RatingStars
          rating={doctor.rating}
          reviews={doctor.reviews}
          size={14}
        />

      </div>

      {/* Distance */}

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">

        <MapPin size={15} />

        <span>
          {doctor.distance} km away
        </span>

      </div>

      {/* Fee */}

      <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-700">

        <IndianRupee size={15} />

        <span className="font-semibold">
          ₹{doctor.consultationFee}
        </span>

      </div>

      {/* Availability */}

      <div className="mt-3 flex justify-center">

        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-medium
            text-green-700
          "
        >
          <Clock size={13} />

          {doctor.availability}
        </span>

      </div>

    </div>
  );
};

export default DoctorCard;