import { useEffect, useMemo, useState } from "react";

import NextAppointmentBanner from "../components/appointments/NextAppointmentBanner";
import AppointmentStats from "../components/appointments/AppointmentStats";
import AppointmentFilters from "../components/appointments/AppointmentFilters";
import AppointmentList from "../components/appointments/AppointmentList";
import AppointmentDetailsDrawer from "../components/appointments/AppointmentDetailsDrawer";
import { getMyAppointments } from "../api/appointmentApi";

const AppointmentsPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  const loadAppointments = async () => {
       setLoadError("");
       setLoading(true);
          
       try {
      
          const response =
              await getMyAppointments();
      
          const mapped = response.map((appointment) => ({
              id: appointment.id,
              doctorName: appointment.doctor_name,
              specialization:appointment.doctor_specialty,
              hospital:appointment.doctor_clinic,
              date:appointment.appointment_date,
              time:appointment.appointment_time,
              status:appointment.status,
              reason:appointment.reason,
              notes:appointment.notes,
              image: null,
          }));
        
          const statusOrder = {
              confirmed: 1,
              pending: 2,
              completed: 3,
              cancelled: 4,
          };
  
          mapped.sort((a, b) => {
          
                  const statusDiff =
                      (statusOrder[a.status] ?? 5) -
                      (statusOrder[b.status] ?? 5);

                  if (statusDiff !== 0) {
                      return statusDiff;
                  }
                
                  const dateA = new Date(`${a.date}T${a.time || "00:00"}`);
                
                  const dateB = new Date(`${b.date}T${b.time || "00:00"}`);
                
                  return dateA - dateB;
              });
              
                setAppointments(mapped);
              
            } catch (error) {
            
                console.error(error);
                setLoadError("Appointments could not be loaded. Please try again.");
            
            } finally {
            
                setLoading(false);
            
            }
          
        };

    useEffect(() => {
      
        loadAppointments();
      
    }, []);


    if (loading) {

        return (
        
            <div className="flex justify-center py-20">
            
                Loading appointments...
        
            </div>

        );
      
    }

    const filteredAppointments = appointments.filter((appointment) => {

        if (activeFilter === "All") {
            return true;
        }

        if (
            activeFilter === "Upcoming"
        ) {
            const start = new Date(`${appointment.date}T${appointment.time || "00:00"}`);
            return ["pending", "confirmed"].includes(appointment.status) && start >= new Date();
        }

        return (
            appointment.status.toLowerCase() ===
            activeFilter.toLowerCase()
        );

    });

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

      {loadError && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">{loadError}<button onClick={loadAppointments} className="ml-3 font-semibold underline">Retry</button></div>}

      {/* Next Appointment Banner */}
      <NextAppointmentBanner 
          appointments={appointments} 
          onView={(appointment) => {
            setSelectedAppointment(appointment);
            setDrawerOpen(true);
          }}
      />

            {/* Appointment Drawer */}
      <AppointmentDetailsDrawer
          appointment={selectedAppointment}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}  
          onRefresh={loadAppointments}
      />

      {/* Statistics */}
      <AppointmentStats appointments={appointments}/>

      {/* Filters */}
      <AppointmentFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
        />

      {/* Appointment List */}
       <AppointmentList
        appointments={filteredAppointments}
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
          onRefresh={loadAppointments}
      />

    </div>
  );
};

export default AppointmentsPage;
