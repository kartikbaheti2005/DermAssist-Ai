import {
  CalendarDays,
  Camera,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";

const SkinScanSection = ({report}) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-sky-100 p-3">

          <ImageIcon className="h-6 w-6 text-sky-600" />

        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Skin Scan
          </h2>

          <p className="text-sm text-slate-500">
            Original lesion image analyzed by the AI model.
          </p>

        </div>

      </div>

      {/* Image + Details */}

      <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">

        {/* Scan Image */}

        <div>

          <img
              src={`http://localhost:8000/${report.imagePath.replace(/\\/g, "/")}`}
              alt="Uploaded lesion"
              className="h-full w-full object-cover"
              onError={(e) => {
                  e.target.src =
                      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80";
              }}
          />

        </div>

        {/* Metadata */}

        <div className="grid gap-4">

          <InfoCard
            icon={CalendarDays}
            title="Scan Date"
            value={new Date(report.uploadedAt).toLocaleDateString()}
          />

          <InfoCard
            icon={MapPin}
            title="Body Location"
            value={report.bodyPart || "Not Specified"}
          />

          <InfoCard
            icon={Camera}
            title="Capture Method"
            value="Mobile Camera"
          />

          <InfoCard
            icon={ImageIcon}
            title="Image Quality"
            value="Excellent"
          />

        </div>

      </div>

    </section>
  );
};

const InfoCard = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-white p-3 shadow-sm">

          <Icon className="h-5 w-5 text-sky-600" />

        </div>

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h4 className="mt-1 font-semibold text-slate-800">
            {value}
          </h4>

        </div>

      </div>

    </div>
  );
};

export default SkinScanSection;