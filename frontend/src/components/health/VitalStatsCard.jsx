import {
  Ruler,
  Weight,
  Activity,
  HeartPulse,
  Droplets,
 Gauge,
} from "lucide-react";

const VitalStatsCard = ({data}) => {
  const bmi =
    data?.height && data?.weight
        ? (
              data.weight /
              Math.pow(data.height / 100, 2)
          ).toFixed(1)
        : "--";
  
  const stats = [
    {
      title: "Height",
      value: data?.height,
      icon: Ruler,
      color: "text-blue-600",
    },
    {
      title: data?.Weight,
      value: "68 kg",
      icon: Weight,
      color: "text-emerald-600",
    },
    {
      title: "BMI",
      value: bmi,
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Blood Group",
      value: "O+",
      icon: Droplets,
      color: "text-red-500",
    },
  ];
  

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Vital Statistics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your latest recorded health measurements.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-5
                transition
                hover:shadow-md
              "
            >

              <div className="mb-4">

                <Icon
                  size={26}
                  className={item.color}
                />

              </div>

              <p className="text-sm text-slate-500">

                {item.title}

              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">

                {item.value}

              </h3>

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default VitalStatsCard;