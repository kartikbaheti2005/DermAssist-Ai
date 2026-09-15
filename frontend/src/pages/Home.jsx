// ===============================
// Imports
// ===============================

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import QuickActions from "../components/dashboard/QuickActions";
import StatsCard from "../components/dashboard/StatsCard";
import HealthCard from "../components/dashboard/HealthCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import AppointmentCard from "../components/dashboard/AppointmentCard";
import HealthScore from "../components/dashboard/HealthScore";
import AIKnowledgeHub from "../components/dashboard/AIKnowledgeHub";
import {
  ScanSearch,
  Stethoscope,
  CalendarDays,
  HeartPulse,
} from "lucide-react";

// ===============================
// Component
// ===============================

const Home = () => {
  return (
    <div className="space-y-10">

      {/* Welcome */}

      <WelcomeBanner />

      {/* Quick Actions */}

      <QuickActions />

      {/* Dashboard Statistics */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Predictions"
          value="0"
          icon={ScanSearch}
          color="blue"
        />

        <StatsCard
          title="Doctors"
          value="0"
          icon={Stethoscope}
          color="green"
        />

        <StatsCard
          title="Appointments"
          value="0"
          icon={CalendarDays}
          color="purple"
        />

        <StatsCard
          title="Health Score"
          value="--"
          icon={HeartPulse}
          color="red"
        />

      </div>
      {/* Second Row */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <HealthCard />

          <ActivityTimeline />

      </div>
      {/* Third Row */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <AIInsightCard />

          <AppointmentCard />

      </div>
      {/* Fourth Row */}

      <div className="grid grid-cols-1 gap-6">
        
          <HealthScore />
        
      </div>

      {/* AI Knowledge Hub */}

      <div className="mt-8">

          <AIKnowledgeHub />

      </div>

    </div>
  );
};

// ===============================
// Export
// ===============================

export default Home;