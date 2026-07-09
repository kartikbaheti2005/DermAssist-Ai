import { useState } from "react";

import PersonalStep from "./steps/PersonalStep";
import PhysicalStep from "./steps/PhysicalStep";
import MedicalStep from "./steps/MedicalStep";
import LifeStyleStep from "./steps/LifestyleStep";
import ReviewStep from "./steps/ReviewStep";

const steps = [
  "Personal",
  "Physical",
  "Medical",
  "Lifestyle",
  "Review",
];

const HealthProfileWizard = ({onComplete}) => {

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({

  // Personal
  age: "",
  gender: "",
  bloodGroup: "",

  // Physical
  height: "",
  weight: "",

  //Medical
  chronicDiseases: [],
  otherChronicDisease: "",
  skinConditions: [],
  otherSkinCondition: "",
  allergies: "",
  medications: "",

  //Lifestyle
  // Lifestyle

  smoking: "",
  alcohol: "",
  exercise: "",
  sunExposure: "",
  sunscreenUsage: "",
  skinType: "",

});

  const renderStep = () => {

    switch (currentStep) {

      case 0:
        return (
          <PersonalStep
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 1:
        return (
          <PhysicalStep
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 2:
        return(
            <MedicalStep
             formData={formData}
             setFormData ={setFormData}
             />
        );

      case 3:
        return (
            <LifeStyleStep
            formData = {formData}
            setFormData = {setFormData}
            />
        );

      case 4:
        return(
            <ReviewStep
            formData = {formData}
            setFormData = {setFormData}
            />
        );

      default:
        return null;

    }

  };

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-slate-800">

          Set Up Health Profile

        </h1>

        <p className="mt-2 text-slate-500">

          Complete your health profile once to receive
          personalized AI recommendations.

        </p>

      </div>

      {/* Progress */}

      <div className="mb-10 flex items-center justify-between">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex flex-1 items-center"
          >

            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                font-semibold
                ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }
              `}
            >

              {index + 1}

            </div>

            {index !== steps.length - 1 && (

              <div
                className={`
                  h-1
                  flex-1
                  ${
                    index < currentStep
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }
                `}
              />

            )}

          </div>

        ))}

      </div>

      {/* Step */}

      <div className="min-h-[320px]">

        {renderStep()}

      </div>

      {/* Footer */}

      <div className="mt-10 flex justify-between">

        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            disabled:opacity-40
          "
        >

          Back

        </button>

        <button
         onClick={() => {

          if (currentStep < 4) {
        
            setCurrentStep(currentStep + 1);
        
          } else {
        
            console.log(formData);
        
            if (onComplete) {
            
              onComplete(formData);
            
            }
        
          }
        
        }}
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
          "
        >

          {currentStep === 4
            ? "Save Health Profile"
            : "Next"}

        </button>

      </div>

    </div>

  );

};

export default HealthProfileWizard;