import { ClipboardList } from "lucide-react";

const chronicDiseaseOptions = [
  "Diabetes",
  "Hypertension",
  "Thyroid Disorder",
  "Asthma",
  "Autoimmune Disease",
  "Other",
  "None",
];

const skinConditionOptions = [
  "Acne",
  "Eczema",
  "Psoriasis",
  "Vitiligo",
  "Fungal Infection",
  "Skin Cancer",
  "Other",
  "None",
];

const MedicalStep = ({ formData, setFormData }) => {

  const handleCheckbox = (field, option) => {

    let updated = [...formData[field]];

    if (option === "None") {

      updated = ["None"];

    } else {

      updated = updated.filter(item => item !== "None");

      if (updated.includes(option)) {

        updated = updated.filter(item => item !== option);

      } else {

        updated.push(option);

      }

    }

    setFormData({
      ...formData,
      [field]: updated,
    });

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  return (

    <div>

      <div className="mb-8">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          <ClipboardList
            size={28}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-2xl font-bold text-slate-800">

          Medical History

        </h2>

        <p className="mt-2 text-slate-500">

          Help us understand your medical background.

        </p>

      </div>

      {/* Chronic Diseases */}

      <div className="mb-8">

        <h3 className="mb-4 text-lg font-semibold">

          Chronic Medical Conditions

        </h3>

        <div className="grid grid-cols-2 gap-3">

          {chronicDiseaseOptions.map(option => (

            <label
              key={option}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
            >

              <input
                type="checkbox"
                checked={formData.chronicDiseases.includes(option)}
                onChange={() =>
                  handleCheckbox("chronicDiseases", option)
                }
              />

              {option}

            </label>

          ))}

        </div>

        {formData.chronicDiseases.includes("Other") && (

          <input
            type="text"
            name="otherChronicDisease"
            placeholder="Specify other condition"
            value={formData.otherChronicDisease}
            onChange={handleChange}
            className="mt-4 w-full rounded-xl border border-slate-300 p-3"
          />

        )}

      </div>

      {/* Skin Conditions */}

      <div className="mb-8">

        <h3 className="mb-4 text-lg font-semibold">

          Previous Skin Conditions

        </h3>

        <div className="grid grid-cols-2 gap-3">

          {skinConditionOptions.map(option => (

            <label
              key={option}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
            >

              <input
                type="checkbox"
                checked={formData.skinConditions.includes(option)}
                onChange={() =>
                  handleCheckbox("skinConditions", option)
                }
              />

              {option}

            </label>

          ))}

        </div>

        {formData.skinConditions.includes("Other") && (

          <input
            type="text"
            name="otherSkinCondition"
            placeholder="Specify skin condition"
            value={formData.otherSkinCondition}
            onChange={handleChange}
            className="mt-4 w-full rounded-xl border border-slate-300 p-3"
          />

        )}

      </div>

      {/* Allergies */}

      <div className="mb-8">

        <label className="mb-2 block text-lg font-semibold">

          Allergies

        </label>

        <textarea
          rows={3}
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Mention allergies if any..."
          className="w-full rounded-xl border border-slate-300 p-3"
        />

      </div>

      {/* Medications */}

      <div>

        <label className="mb-2 block text-lg font-semibold">

          Current Medications

        </label>

        <textarea
          rows={3}
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          placeholder="Current medications..."
          className="w-full rounded-xl border border-slate-300 p-3"
        />

      </div>

    </div>

  );

};

export default MedicalStep;