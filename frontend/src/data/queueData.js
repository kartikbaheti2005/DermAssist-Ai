export const queueSummary = {
  queueNumber: "A-24",
  tokenNumber: 24,
  priority: "Medium",
  estimatedWait: "18 min",
  patientsAhead: 5,
  doctor: "Dr. Sarah Johnson",
  specialization: "Dermatologist",
  room: "Room 204",
  appointmentTime: "10:30 AM",
};

export const queueStatus = {
  currentStage: "Waiting for Doctor",
  status: "In Queue",
  progress: 60,
};

export const queueTimeline = [
  {
    id: 1,
    title: "Appointment Confirmed",
    completed: true,
    time: "09:45 AM",
  },
  {
    id: 2,
    title: "Checked In",
    completed: true,
    time: "10:05 AM",
  },
  {
    id: 3,
    title: "Waiting for Doctor",
    completed: false,
    current: true,
    time: "Now",
  },
  {
    id: 4,
    title: "Consultation",
    completed: false,
    current: false,
    time: "--",
  },
  {
    id: 5,
    title: "Completed",
    completed: false,
    current: false,
    time: "--",
  },
];

export const smartQueueInsights = [
  "Average waiting time today is 16 minutes.",
  "Queue is moving faster than usual.",
  "Your appointment is on schedule.",
];