import { Sun, Dumbbell } from "lucide-react";

const LifestyleStep = ({ formData, setFormData }) => {

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const SelectField = ({ label, name, options }) => (

    <div>

      <label className="mb-2 block font-semibold text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-300 p-3"
      >

        <option value="">Select</option>

        {options.map(option => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    </div>

  );

  return (

    <div>

      <div className="mb-8">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          <Sun
            size={28}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-2xl font-bold text-slate-800">

          Lifestyle

        </h2>

        <p className="mt-2 text-slate-500">

          Help us personalize your skin health recommendations.

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <SelectField
          label="Smoking"
          name="smoking"
          options={[
            "Never",
            "Occasionally",
            "Regularly",
          ]}
        />

        <SelectField
          label="Alcohol"
          name="alcohol"
          options={[
            "Never",
            "Occasionally",
            "Frequently",
          ]}
        />

        <SelectField
          label="Exercise"
          name="exercise"
          options={[
            "Sedentary",
            "1–2 Days / Week",
            "3–5 Days / Week",
            "Daily",
          ]}
        />

        <SelectField
          label="Daily Sun Exposure"
          name="sunExposure"
          options={[
            "<30 Minutes",
            "30–60 Minutes",
            "1–3 Hours",
            ">3 Hours",
          ]}
        />

        <SelectField
          label="Sunscreen Usage"
          name="sunscreenUsage"
          options={[
            "Always",
            "Sometimes",
            "Rarely",
            "Never",
          ]}
        />

        <SelectField
          label="Skin Type"
          name="skinType"
          options={[
            "Normal",
            "Dry",
            "Oily",
            "Combination",
            "Sensitive",
          ]}
        />

      </div>

    </div>

  );

};

export default LifestyleStep;