import { doctors } from "./doctors";

export const reports = [
  {
    id: "REP-1001",
    reportNumber: "RPT-2026-001",

    doctor: doctors[0],

    disease: "Melanocytic Nevus",

    confidence: 98.4,

    risk: "Low",

    scanDate: "26 June 2026",

    generatedAt: "26 June 2026, 10:35 AM",

    status: "Generated",

    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",

    recommendation:
      "No immediate concern. Continue regular skin monitoring and schedule a routine dermatology follow-up if noticeable changes occur.",

    aiSummary:
      "The lesion characteristics are highly consistent with a benign melanocytic nevus.",

    saved: true,
  },

  {
    id: "REP-1002",
    reportNumber: "RPT-2026-002",

    doctor: doctors[2],

    disease: "Basal Cell Carcinoma",

    confidence: 94.7,

    risk: "High",

    scanDate: "18 June 2026",

    generatedAt: "18 June 2026, 03:10 PM",

    status: "Generated",

    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",

    recommendation:
      "Consult a dermatologist immediately for biopsy confirmation and treatment planning.",

    aiSummary:
      "Lesion characteristics strongly indicate basal cell carcinoma with high confidence.",

    saved: true,
  },

  {
    id: "REP-1003",
    reportNumber: "RPT-2026-003",

    doctor: doctors[1],

    disease: "Benign Keratosis",

    confidence: 91.2,

    risk: "Medium",

    scanDate: "10 June 2026",

    generatedAt: "10 June 2026, 09:20 AM",

    status: "Generated",

    image:
      "https://images.unsplash.com/photo-1606206873764-fd15e242df52?w=600&q=80",

    recommendation:
      "Monitor the lesion and seek consultation if any changes in size, shape, or color are observed.",

    aiSummary:
      "Findings are compatible with benign keratosis with no urgent intervention required.",

    saved: false,
  },
];