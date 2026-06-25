import { createContext, useContext, useEffect, useState } from "react";

import { loginUser, registerUser } from "../api/authApi";

import {
  saveToken,
  getToken,
  saveUser,
  getUser,
  saveRole,
  getRole,
  clearAuth,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore session on app startup
   */
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    const storedRole = getRole();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setRole(storedRole);
    }

    setLoading(false);
  }, []);

  /**
   * Login
   */
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);

      const authToken = data.access_token;
      const authUser = data.user;
      const authRole = data.user?.role;

      saveToken(authToken);
      saveUser(authUser);
      saveRole(authRole);

      setToken(authToken);
      setUser(authUser);
      setRole(authRole);

      return {
        success: true,
        role: authRole,
        user: authUser,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Login failed",
      };
    }
  };

  /**
   * Register
   */
  const register = async (userData) => {
    try {
      const data = await registerUser(userData);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Registration failed",
      };
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    clearAuth();

    setUser(null);
    setRole(null);
    setToken(null);
  };

  const value = {
    user,
    role,
    token,
    loading,

    isAuthenticated: !!token,

    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Optional direct hook export
 */
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;