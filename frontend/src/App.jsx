import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import DoctorRoute from "./components/routes/DoctorRoute";
import AdminRoute from "./components/routes/AdminRoute";

// Public Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// User Pages
import Home from "./pages/Home";
import HealthRecordsPage from "./pages/HealthRecordsPage";
import LesionTrackerPage from "./pages/LesionTrackerPage";
import QueuePage from "./pages/QueuePage";
import OutbreakPage from "./pages/OutbreakPage";

// Doctor Pages
import DoctorDashboard from "./pages/DoctorDashboard";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/health-records"
        element={
          <ProtectedRoute>
            <HealthRecordsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lesion-tracker"
        element={
          <ProtectedRoute>
            <LesionTrackerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/queue"
        element={
          <ProtectedRoute>
            <QueuePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/outbreak"
        element={
          <ProtectedRoute>
            <OutbreakPage />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <DoctorRoute>
            <DoctorDashboard />
          </DoctorRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;