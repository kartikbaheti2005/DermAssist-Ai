// ===============================
// Imports
// ===============================

import { useState } from "react";

import EmptyHealthState from "../components/health/EmptyHealthState";
import HealthProfileWizard from "../components/health/HealthProfileWizard";
import HealthIdentityCard from "../components/health/HealthIdentityCard";
import HealthSummary from "../components/health/HealthSummary";
import VitalStatsCard from "../components/health/VitalStatsCard";

// ===============================
// Component
// ===============================

const HealthRecordsPage = () => {

  // Temporary states
  // Later these will come from the backend

  const [hasHealthRecord, setHasHealthRecord] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [showWizard, setShowWizard] = useState(false);

  // Empty State
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
        onComplete={(data) => {
        
            setHealthData(data);
        
            setShowWizard(false);
        
            setHasHealthRecord(true);
        
        }}
      />

    );

  }

  // Health Dashboard

  return (

    <div className="space-y-8">

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