import EmptyAppointmentState from "./EmptyAppointmentState";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = ({
  appointments,
  onSelect,
}) => {
  if (!appointments?.length) {
    return <EmptyAppointmentState />;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onView={onSelect}
        />
      ))}
    </div>
  );
};

export default AppointmentList;