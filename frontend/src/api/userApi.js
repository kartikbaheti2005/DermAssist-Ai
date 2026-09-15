import apiClient from "./axios";

/**
 * Get Current User Profile
 */
export const getCurrentProfile = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

/**
 * Update Current User Profile
 */
export const updateProfile = async (payload) => {
  const response = await apiClient.put(
    "/users/me",
    payload
  );

  return response.data;
};