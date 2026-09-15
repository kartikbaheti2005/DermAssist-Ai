export const mapAssistantContext = (context) => ({
    healthSnapshot: {
        bmi: context.latest_health_record?.bmi,
        bloodGroup: context.latest_health_record?.blood_group,
        allergies: context.latest_health_record?.allergies,
        medications: context.latest_health_record?.medications,
    },

    latestPrediction: {
        disease: context.latest_prediction?.disease,
        confidence: context.latest_prediction?.confidence,
        risk: context.latest_prediction?.risk_level,
        model: "DermAssist AI",
    },

    latestReport: {
        id: context.latest_prediction?.id,
        generatedOn: context.latest_prediction?.created_at,
        status: "Generated",
    },

    nextAppointment: {
        doctor: context.next_appointment?.doctor?.name,
        specialization: context.next_appointment?.doctor?.specialty,
        date: context.next_appointment?.appointment_date,
        time: context.next_appointment?.appointment_time,
        status: context.next_appointment?.status,
    },
});