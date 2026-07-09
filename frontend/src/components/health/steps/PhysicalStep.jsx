import { Ruler, Weight } from "lucide-react";

const PhysicalStep = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div>

      {/* Header */}

      <div className="mb-8">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          <Ruler
            size={28}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-2xl font-bold text-slate-800">
          Physical Information
        </h2>

        <p className="mt-2 text-slate-500">
          Enter your height and weight. BMI will be calculated automatically.
        </p>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            placeholder="e.g. 175"
            value={formData.height}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            placeholder="e.g. 68"
            value={formData.weight}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

        </div>

      </div>

      {/* BMI Preview */}

      <div className="mt-8 rounded-2xl bg-blue-50 p-5">

        <div className="flex items-center gap-3">

          <Weight
            size={22}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold text-slate-800">
              BMI Preview
            </h3>

            <p className="text-sm text-slate-500">
              Your BMI will be calculated automatically after saving your profile.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default PhysicalStep;