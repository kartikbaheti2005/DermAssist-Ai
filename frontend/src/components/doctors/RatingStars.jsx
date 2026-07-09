import { Star } from "lucide-react";

const RatingStars = ({
  rating = 0,
  reviews = 0,
  size = 16,
}) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-2">

      <div className="flex items-center">

        {[...Array(5)].map((_, index) => (

          <Star
            key={index}
            size={size}
            className={
              index < fullStars
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
          />

        ))}

      </div>

      <span className="text-sm font-medium text-slate-700">
        {rating.toFixed(1)}
      </span>

      <span className="text-sm text-slate-500">
        ({reviews})
      </span>

    </div>
  );
};

export default RatingStars;