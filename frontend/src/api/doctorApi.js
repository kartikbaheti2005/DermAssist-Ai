import apiClient from "./axios";

export const getDoctors = async (params = {}) => {
  console.log("Calling /doctors...");

  const response = await apiClient.get("/doctors", {
    params,
  });

  console.log("Doctors API response:", response);

  return response.data;
};

export const getDoctor = async (doctorId) => {
  const response = await apiClient.get(`/doctors/${doctorId}`);
  return response.data;
};