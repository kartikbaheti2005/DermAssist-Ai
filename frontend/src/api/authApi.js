import axios from "axios";

/**
 * Backend Base URL
 * Move to .env later:
 * VITE_API_BASE_URL=http://localhost:8000
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Register User
 * POST /auth/register
 */
export const registerUser = async (userData) => {
  const response = await authApi.post("/auth/register", userData);
  return response.data;
};

/**
 * Login User
 * POST /auth/login
 */
export const loginUser = async (credentials) => {
  const response = await authApi.post("/auth/login", credentials);
  return response.data;
};

/**
 * Forgot Password
 * POST /auth/forgot-password
 */
export const forgotPassword = async (email) => {
  const response = await authApi.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

/**
 * Reset Password
 * POST /auth/reset-password
 */
export const resetPassword = async (payload) => {
  const response = await authApi.post(
    "/auth/reset-password",
    payload
  );

  return response.data;
};

export default authApi;