import apiClient from "./axios";

/**
 * Register User
 */
export const registerUser = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

/**
 * Login User
 */
export const loginUser = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

/**
 * Get Current User
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

/**
 * Logout
 */
export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

/**
 * Change Password
 */
export const changePassword = async (payload) => {
  const response = await apiClient.post(
    "/auth/change-password",
    payload
  );

  return response.data;
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const response = await apiClient.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

/**
 * Reset Password
 */
export const resetPassword = async (payload) => {
  const response = await apiClient.post(
    "/auth/reset-password",
    payload
  );

  return response.data;
};

export default apiClient;