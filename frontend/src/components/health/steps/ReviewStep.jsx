import {
  User,
  Ruler,
  ClipboardList,
  Sun,
} from "lucide-react";

const Section = ({ icon: Icon, title, children }) => (

  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

    <div className="mb-4 flex items-center gap-3">

      <Icon
        size={22}
        className="text-blue-600"
      />

      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

    </div>

    {children}

  </div>

);

const Item = ({ label, value }) => (

  <div className="flex justify-between border-b border-slate-200 py-2">

    <span className="text-slate-500">
      {label}
    </span>

    <span className="font-medium text-slate-800">
      {value || "-"}
    </span>

  </div>

);

const ReviewStep = ({ formData }) => {

  return (

    <div className="space-y-6">

      <Section
        icon={User}
        title="Personal Information"
      >

        <Item label="Age" value={formData.age} />
        <Item label="Gender" value={formData.gender} />
        <Item label="Blood Group" value={formData.bloodGroup} />

      </Section>

      <Section
        icon={Ruler}
        title="Physical Information"
      >

        <Item
          label="Height"
          value={
            formData.height
              ? `${formData.height} cm`
              : ""
          }
        />

        <Item
          label="Weight"
          value={
            formData.weight
              ? `${formData.weight} kg`
              : ""
          }
        />

      </Section>

      <Section
        icon={ClipboardList}
        title="Medical History"
      >

        <Item
          label="Chronic Diseases"
          value={
            formData.chronicDiseases.length
              ? formData.chronicDiseases.join(", ")
              : "None"
          }
        />

        <Item
          label="Skin Conditions"
          value={
            formData.skinConditions.length
              ? formData.skinConditions.join(", ")
              : "None"
          }
        />

        <Item
          label="Allergies"
          value={formData.allergies}
        />

        <Item
          label="Medications"
          value={formData.medications}
        />

      </Section>

      <Section
        icon={Sun}
        title="Lifestyle"
      >

        <Item
          label="Smoking"
          value={formData.smoking}
        />

        <Item
          label="Alcohol"
          value={formData.alcohol}
        />

        <Item
          label="Exercise"
          value={formData.exercise}
        />

        <Item
          label="Sun Exposure"
          value={formData.sunExposure}
        />

        <Item
          label="Sunscreen"
          value={formData.sunscreenUsage}
        />

        <Item
          label="Skin Type"
          value={formData.skinType}
        />

      </Section>

    </div>

  );

};

export default ReviewStep;