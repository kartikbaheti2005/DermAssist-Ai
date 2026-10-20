import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays, FileHeart, RefreshCw, ScanSearch, ShieldAlert } from "lucide-react";
import { getMyAppointments } from "../api/appointmentApi";
import { getHealthRecords } from "../api/healthRecordApi";
import { getPredictions } from "../api/predictionApi";
import { getCurrentProfile } from "../api/userApi";
import { getUser } from "../services/authService";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import QuickActions from "../components/dashboard/QuickActions";
import StatsCard from "../components/dashboard/StatsCard";
import HealthCard from "../components/dashboard/HealthCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import AppointmentCard from "../components/dashboard/AppointmentCard";
import RiskSummary from "../components/dashboard/RiskSummary";
import CareOrbit from "../components/dashboard/CareOrbit";

const today = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const appointmentTimeMinutes = (value = "") => {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return 0;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (match[3]) {
    const meridiem = match[3].toUpperCase();
    hours = (hours % 12) + (meridiem === "PM" ? 12 : 0);
  }
  return hours * 60 + minutes;
};

const getUpcomingAppointments = (appointments) => appointments
  .filter((appointment) => {
    const status = String(appointment.status || "").toLowerCase();
    const date = new Date(`${appointment.appointment_date}T00:00:00`);
    return !["completed", "cancelled", "rejected"].includes(status) && !Number.isNaN(date.getTime()) && date >= today();
  })
  .sort((a, b) => {
    const dateDifference = new Date(`${a.appointment_date}T00:00:00`) - new Date(`${b.appointment_date}T00:00:00`);
    return dateDifference || appointmentTimeMinutes(a.appointment_time) - appointmentTimeMinutes(b.appointment_time);
  });

const Home = () => {
  const [dashboard, setDashboard] = useState({
    profile: getUser(), predictions: [], appointments: [], records: [], loading: true, loadError: false,
  });
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const [profileResult, predictionResult, appointmentResult, recordResult] = await Promise.allSettled([
        getCurrentProfile(), getPredictions(), getMyAppointments(), getHealthRecords(),
      ]);
      if (!active) return;
      setDashboard({
        profile: profileResult.status === "fulfilled" ? profileResult.value : getUser(),
        predictions: predictionResult.status === "fulfilled" && Array.isArray(predictionResult.value) ? predictionResult.value : [],
        appointments: appointmentResult.status === "fulfilled" && Array.isArray(appointmentResult.value) ? appointmentResult.value : [],
        records: recordResult.status === "fulfilled" && Array.isArray(recordResult.value) ? recordResult.value : [],
        loading: false,
        loadError: [profileResult, predictionResult, appointmentResult, recordResult].some((result) => result.status === "rejected"),
      });
    };
    load();
    return () => { active = false; };
  }, [retryKey]);

  const upcoming = getUpcomingAppointments(dashboard.appointments);
  const latestRecord = dashboard.records[0] || null;
  const activities = [
    ...dashboard.predictions.map((item) => ({
      kind: "prediction", date: item.created_at, title: "Skin screening completed",
      description: `${String(item.predicted_label || "Screening result").replaceAll("_", " ")} · ${item.risk_level || "Risk not available"} model output`,
    })),
    ...dashboard.appointments.map((item) => ({
      kind: "appointment", date: item.created_at || item.appointment_date,
      title: `Appointment ${String(item.status || "updated").toLowerCase()}`,
      description: `${item.doctor_name || "Dermatology visit"} · ${item.appointment_date || "Date unavailable"}`,
    })),
    ...dashboard.records.slice(0, 1).map((item) => ({
      kind: "record", date: item.record_date || item.created_at,
      title: "Health record saved", description: "Your latest health profile information",
    })),
  ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 5);

  return (
    <div className="space-y-8 pb-8">
      <WelcomeBanner profile={dashboard.profile} loading={dashboard.loading} />
      {dashboard.loadError && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><p className="inline-flex items-center gap-2"><AlertCircle size={17} aria-hidden="true" />Some dashboard information could not be loaded. The displayed counts may be incomplete.</p><button type="button" onClick={() => { setDashboard((current) => ({ ...current, loading: true })); setRetryKey((key) => key + 1); }} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"><RefreshCw size={15} aria-hidden="true" />Retry</button></div>}

      <section aria-label="Health overview" className="dashboard-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Skin screenings" value={dashboard.predictions.length} icon={ScanSearch} color="blue" loading={dashboard.loading} />
        <StatsCard title="High-risk model results" value={dashboard.predictions.filter((item) => String(item.risk_level).toLowerCase() === "high").length} icon={ShieldAlert} color="red" loading={dashboard.loading} />
        <StatsCard title="Upcoming appointments" value={upcoming.length} icon={CalendarDays} color="purple" loading={dashboard.loading} />
        <StatsCard title="Health records" value={dashboard.records.length} icon={FileHeart} color="green" loading={dashboard.loading} />
      </section>

      <QuickActions />

      <CareOrbit />

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2" aria-label="Your health and care">
        <HealthCard record={latestRecord} profile={dashboard.profile} loading={dashboard.loading} />
        <AppointmentCard appointment={upcoming[0] || null} loading={dashboard.loading} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2" aria-label="Recent screening and activity">
        <AIInsightCard prediction={dashboard.predictions[0] || null} loading={dashboard.loading} />
        <RiskSummary predictions={dashboard.predictions} loading={dashboard.loading} />
      </section>

      <ActivityTimeline activities={activities} loading={dashboard.loading} />
    </div>
  );
};

export default Home;
