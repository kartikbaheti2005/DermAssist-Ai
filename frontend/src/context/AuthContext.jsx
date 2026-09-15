import {  
  useState, 
  useEffect,
  useContext, 
  useRef, 
  createContext 
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../api/authApi";

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
  const hasRestoredSession = useRef(false);

  /**
   * Restore authenticated session from backend.
   */
  const restoreSession = async () => {
    const storedToken = getToken();

    console.log("Token from getToken():", storedToken);

    if (!storedToken) {
      console.log("No token found. Exiting restoreSession.");
      setLoading(false);
      return;
    }

    console.log("Calling /auth/me");

    try {
      const currentUser = await getCurrentUser();
      const currentRole = currentUser?.role;
      console.log("currentUser:", currentUser);
    
      saveUser(currentUser);
      saveRole(currentRole);
      
      console.log("Session restored successfully");

      setToken(storedToken);
      setUser(currentUser);
      setRole(currentRole);
    } catch (error) {
      clearAuth();
    
      setToken(null);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };
  /**
   * Restore session on app startup
   */
   useEffect(() => {
    if (hasRestoredSession.current) return;

    hasRestoredSession.current = true;
    restoreSession();
  }, []);

  /**
   * Login
   */
  const login = async (credentials) => {
    try {
      console.time("LOGIN TOTAL");

      console.time("LOGIN API");
      const data = await loginUser(credentials);
      console.timeEnd("LOGIN API");

      console.time("SAVE AUTH");

      const authToken = data.access_token;
      const authUser = data.user;
      const authRole = authUser?.role;

      saveToken(authToken);
      saveUser(authUser);
      saveRole(authRole);

      setToken(authToken);
      setUser(authUser);
      setRole(authRole);

      console.timeEnd("SAVE AUTH");

      console.timeEnd("LOGIN TOTAL");

      return {
        success: true,
        role: authRole,
        user: authUser,
      };
    }
    catch (error) {
      let message = "Login failed";
    
      if (Array.isArray(error?.response?.data?.detail)) {
        message =
          error.response.data.detail[0]?.msg || message;
      } else if (typeof error?.response?.data?.detail === "string") {
        message = error.response.data.detail;
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      }
    
      return {
        success: false,
        message,
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
    }catch (error) {
      let message = "Registration failed";
        
      if (Array.isArray(error?.response?.data?.detail)) {
        message =
          error.response.data.detail[0]?.msg || message;
      } else if (typeof error?.response?.data?.detail === "string") {
        message = error.response.data.detail;
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      }
    
      return {
        success: false,
        message,
      };
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Ignore backend logout errors and always clear the local session.
    } finally {
      clearAuth();

      setUser(null);
      setRole(null);
      setToken(null);
    }
  };

  const value = {
    // ==========================
    // State
    // ==========================
    user,
    setUser,

    role,
    setRole,

    token,
    setToken,

    loading,

    // ==========================
    // Auth Status
    // ==========================
    isAuthenticated: !!token,

    // ==========================
    // Actions
    // ==========================
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