import { useState } from "react";

import NextAppointmentBanner from "../components/appointments/NextAppointmentBanner";
import AppointmentStats from "../components/appointments/AppointmentStats";
import AppointmentFilters from "../components/appointments/AppointmentFilters";
import AppointmentList from "../components/appointments/AppointmentList";
import AppointmentDetailsDrawer from "../components/appointments/AppointmentDetailsDrawer";
import { appointments } from "../data/appointments";

const AppointmentsPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="-mt-2">
        <h1 className="text-3xl font-bold text-slate-800">
          My Appointments
        </h1>

        <p className="mt-2 text-slate-500">
          Manage, track and review all your dermatology consultations.
        </p>
      </div>

      {/* Next Appointment Banner */}
      <NextAppointmentBanner />

      {/* Statistics */}
      <AppointmentStats />

      {/* Filters */}
      <AppointmentFilters />

      {/* Appointment List */}
       <AppointmentList
        appointments={appointments}
        onSelect={(appointment) => {
          setSelectedAppointment(appointment);
          setDrawerOpen(true);
        }}
      />

      {/* Appointment Drawer */}
      <AppointmentDetailsDrawer
        appointment={selectedAppointment}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

    </div>
  );
};

export default AppointmentsPage;