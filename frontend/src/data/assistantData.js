export const conversations = [
  {
    id: 1,
    title: "Understanding My Skin Report",
    preview: "Can you explain my latest AI prediction?",
    updatedAt: "2 min ago",
    messages: [
      {
        id: 1,
        role: "assistant",
        content:
          "Hello! I'm your Medical AI Copilot. I can help explain your reports, AI predictions, health records and appointments.",
        timestamp: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    title: "Melanoma Prevention",
    preview: "How can I reduce my risk?",
    updatedAt: "Yesterday",
    messages: [],
  },
];

export const healthSnapshot = {
  bmi: "22.4",
  bloodGroup: "B+",
  allergies: "None",
  medications: "None",
};

export const latestPrediction = {
  disease: "Melanocytic Nevus",
  confidence: "96.8%",
  risk: "Low",
  model: "EfficientNetV2",
};

export const latestReport = {
  id: "RPT-2026-001",
  generatedOn: "26 Jun 2026",
  status: "Available",
};

export const nextAppointment = {
  doctor: "Dr. Sarah Johnson",
  specialization: "Dermatologist",
  date: "30 Jun 2026",
  time: "10:30 AM",
  status: "Confirmed",
};

export const quickActions = [
  {
    id: 1,
    title: "Explain My Report",
    action: "report",
    prompt: "Can you explain my latest skin analysis report in simple language?",
  },
  {
    id: 2,
    title: "Analyze Prediction",
    action: "prediction",
    prompt: "Analyze my latest AI prediction and explain the risk level.",
  },
  {
    id: 3,
    title: "Review Health Record",
    action: "health",
    prompt: "Review my latest health record and summarize the important information.",
  },
  {
    id: 4,
    title: "Prepare for Appointment",
    action: "appointment",
    prompt: "Help me prepare for my upcoming dermatologist appointment.",
  },
];

export const suggestedQuestions = [
  "Can you explain my latest skin analysis report?",
  "What does my AI prediction mean?",
  "Should I consult a dermatologist?",
  "How can I reduce my skin cancer risk?",
  "What should I ask during my appointment?",
  "Can you summarize my health record?",
];

export const suggestedFollowUps = [
  "Explain this in simpler terms",
  "What should I do next?",
  "Should I consult a dermatologist?",
  "Show prevention tips",
];

