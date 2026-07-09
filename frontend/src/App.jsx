import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import DoctorRoute from "./components/routes/DoctorRoute";
import AdminRoute from "./components/routes/AdminRoute";

import DashboardLayout from "./components/layout/DashboardLayout";

// Public Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// User Pages
import Home from "./pages/Home";
import HealthRecordsPage from "./pages/HealthRecordsPage";
import LesionTrackerPage from "./pages/LesionTrackerPage";
import QueuePage from "./pages/QueuePage";
import OutbreakPage from "./pages/OutbreakPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentPage from "./pages/AppointmentPage";
import AppointmentBookingPage from "./pages/AppointmentBookingPage";
import ReportPage from "./pages/ReportPage";
import ReportViewerPage from "./pages/ReportViewerPage";
import AIAssistantPage from "./pages/AIAssistantPage";

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
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
      <Route index element={<Home />} />
      
      <Route
          path="health-records"
          element={<HealthRecordsPage />}
        />

      <Route
          path="lesion-tracker"
          element={<LesionTrackerPage />}
        />

      <Route
          path="queue"
          element={<QueuePage />}
        />

      <Route
          path="outbreak"
          element={<OutbreakPage />}
        />

      <Route
          path="/doctors"
          element={<DoctorsPage />}
      />

      <Route
          path="/appointments"
          element={<AppointmentPage />}
        />
   
      <Route
          path="/appointments/book"
          element={<AppointmentBookingPage />}
        />

      <Route
          path="reports"
          element={<ReportPage />}
        />

      <Route
          path="reports/:reportId"
          element={<ReportViewerPage />}
        />

      <Route
          path="/assistant"
          element={<AIAssistantPage />}
        />

      <Route
          path="/queue"
          element={<QueuePage />}
        />

      </Route>


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