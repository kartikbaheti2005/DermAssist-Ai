import { UserRound } from "lucide-react";

const PersonalStep = ({ formData, setFormData }) => {

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

          <UserRound
            size={28}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h2>

        <p className="mt-2 text-slate-500">
          Tell us a little about yourself. This information helps personalize your health profile.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >

            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>

          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >

            <option value="">Select Blood Group</option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>

          </select>

        </div>

      </div>

    </div>

  );

};

export default PersonalStep;