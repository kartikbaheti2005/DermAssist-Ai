import apiClient from "./axios";

/**
 * Create Appointment
 */
export const createAppointment = async (payload) => {
    const response = await apiClient.post(
        "/appointments",
        payload
    );

    return response.data;
};

/**
 * Get My Appointments
 */
export const getMyAppointments = async () => {
    const response = await apiClient.get(
        "/appointments/my"
    );

    return response.data;
};

/**
 * Get Appointment Details
 */
export const getAppointment = async (appointmentId) => {
    const response = await apiClient.get(
        `/appointments/${appointmentId}`
    );

    return response.data;
};

/**
 * Cancel Appointment
 */
export const cancelAppointment = async (appointmentId) => {
    const response = await apiClient.put(
        `/appointments/${appointmentId}/cancel`
    );

    return response.data;
};

/**
 * Reschedule Appointment
 */
export const rescheduleAppointment = async (
    appointmentId,
    payload
) => {
    const response = await apiClient.put(
        `/appointments/${appointmentId}/reschedule`,
        payload
    );

    return response.data;
};

/**
 * Available Slots
 */
export const getAvailableSlots = async (
    doctorId,
    date
) => {
    const response = await apiClient.get(
        `/appointments/available-slots/${doctorId}`,
        {
            params: {
                date,
            },
        }
    );

    return response.data;
};