const TOKEN_KEY = "dermassist_token";
const USER_KEY = "dermassist_user";
const ROLE_KEY = "dermassist_role";

/**
 * Token Management
 */
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * User Management
 */
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Role Management
 */
export const saveRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const removeRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

/**
 * Auth State Helpers
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Clear Entire Session
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
  removeRole();
};