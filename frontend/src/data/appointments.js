import { doctors } from "./doctors";

export const appointments = [
  {
    id: 1,
    doctor: doctors[0],

    date: "28 June 2026",
    time: "10:30 AM",

    mode: "Online",

    status: "Confirmed",

    reason: "Persistent acne treatment",

    notes: "Recurring acne for the last 6 months.",

    appointmentId: "APT-1001",
  },

  {
    id: 2,
    doctor: doctors[1],

    date: "30 June 2026",
    time: "04:00 PM",

    mode: "Offline",

    status: "Pending",

    reason: "Skin allergy consultation",

    notes: "Rashes after seasonal change.",

    appointmentId: "APT-1002",
  },

  {
    id: 3,
    doctor: doctors[2],

    date: "12 June 2026",
    time: "11:00 AM",

    mode: "Online",

    status: "Completed",

    reason: "Mole examination",

    notes: "Routine skin screening.",

    appointmentId: "APT-1003",
  },

  {
    id: 4,
    doctor: doctors[3],

    date: "18 June 2026",
    time: "09:30 AM",

    mode: "Offline",

    status: "Cancelled",

    reason: "Hair fall consultation",

    notes: "Cancelled by patient.",

    appointmentId: "APT-1004",
  },
];