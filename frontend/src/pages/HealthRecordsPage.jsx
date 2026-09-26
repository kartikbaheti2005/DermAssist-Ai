// ===============================
// Imports
// ===============================

import { useEffect, useState } from "react";

import EmptyHealthState from "../components/health/EmptyHealthState";
import HealthProfileWizard from "../components/health/HealthProfileWizard";
import HealthIdentityCard from "../components/health/HealthIdentityCard";
import HealthSummary from "../components/health/HealthSummary";
import VitalStatsCard from "../components/health/VitalStatsCard";

import {
  createHealthRecord,
  getLatestHealthRecord,
  updateHealthRecord,
} from "../api/healthRecordApi";

// ===============================
// Component
// ===============================

const HealthRecordsPage = () => {

  // Temporary states
  // Later these will come from the backend

  const [hasHealthRecord, setHasHealthRecord] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
  
  const loadHealthRecord = async () => {
  
    try {
    
      const latest =
        await getLatestHealthRecord();
    
      if (
        latest &&
        !latest.message
      ) {
      
        setHealthData(latest);
      
        setHasHealthRecord(true);
      
      }
    
    } catch (error) {
    
      console.error(
        "Failed to load health record",
        error
      );
      setLoadError("Health records could not be loaded. Please try again.");
    
    } finally {
    
      setLoading(false);
    
    }
  
  };

  loadHealthRecord();

}, []);

  if (loading) {

  return (

    <div className="flex justify-center py-20">

      Loading health records...

    </div>

  );

}

  // Empty State
  if (loadError && !hasHealthRecord && !showWizard) {
    return <div role="alert" className="space-y-3 rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-800">{loadError}<button onClick={() => window.location.reload()} className="block font-semibold underline">Retry</button></div>;
  }

  if (!hasHealthRecord && !showWizard) {

    return (

      <EmptyHealthState
        onCreate={() => setShowWizard(true)}
      />

    );

  }

  // Health Profile Wizard
  if (showWizard) {

    return (
  <HealthProfileWizard
    initialData={editing ? healthData : null}
    error={saveError}
    onComplete={async (data) => {
      const payload = {
        height_cm:
          data.height === ""
            ? null
            : Number(data.height),

        weight_kg:
          data.weight === ""
            ? null
            : Number(data.weight),

        blood_group:
          data.bloodGroup || null,

        medical_history:
          data.chronicDiseases?.join(", ") || null,

        allergies:
          data.allergies || null,

        medications:
          data.medications || null,

        notes:
          data.skinConditions?.join(", ") || null,
      };

      try {
        if (editing) {
          await updateHealthRecord(
            healthData.id,
            payload
          );
        } else {
          await createHealthRecord(payload);
        }

        const latest =
          await getLatestHealthRecord();

        setHealthData(latest);
        setHasHealthRecord(true);
        setShowWizard(false);
        setEditing(false);
        setSaveError("");
        return true;

      } catch (error) {
        console.error(error);
        setSaveError("Your changes could not be saved. Please try again.");
        return false;
      }
    }}
  />
);

  }

  // Health Dashboard

  return (

    <div className="space-y-8">

      <div className="mb-6 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Health Records
        </h1>

        <p className="mt-1 text-slate-500">
          View and manage your health profile.
        </p>
      </div>

      <button
        onClick={() => {
          setEditing(true);
          setShowWizard(true);
        }}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
  >
        Edit Health Profile
      </button>

    </div>

      <HealthIdentityCard
          data={healthData}
      />

      <HealthSummary
          data={healthData}
      />

      <VitalStatsCard
          data={healthData}
      />

    </div>

);

};

// ===============================
// Export
// ===============================

export default HealthRecordsPage;
