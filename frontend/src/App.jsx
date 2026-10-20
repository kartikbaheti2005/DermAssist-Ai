import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import DoctorRoute from "./components/routes/DoctorRoute";
import AdminRoute from "./components/routes/AdminRoute";

import DashboardLayout from "./components/layout/DashboardLayout";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Home = lazy(() => import("./pages/Home"));
const HealthRecordsPage = lazy(() => import("./pages/HealthRecordsPage"));
const LesionTrackerPage = lazy(() => import("./pages/LesionTrackerPage"));
const QueuePage = lazy(() => import("./pages/QueuePage"));
const OutbreakPage = lazy(() => import("./pages/OutbreakPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const AppointmentPage = lazy(() => import("./pages/AppointmentPage"));
const AppointmentBookingPage = lazy(() => import("./pages/AppointmentBookingPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const ReportViewerPage = lazy(() => import("./pages/ReportViewerPage"));
const AIAssistantPage = lazy(() => import("./pages/AIAssistantPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const DoctorDashboard = lazy(() => import("./pages/DoctorDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
import RouteTransition from "./components/common/RouteTransition";
import RouteLoading from "./components/common/RouteLoading";

const LoadPage = ({ page: Page }) => (
  <Suspense fallback={<RouteLoading />}><Page /></Suspense>
);

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<RouteTransition><LoadPage page={LoginPage} /></RouteTransition>} />
      <Route path="/register" element={<RouteTransition><LoadPage page={RegisterPage} /></RouteTransition>} />

      {/* User Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
      <Route index element={<LoadPage page={Home} />} />
      
      <Route
          path="health-records"
          element={<LoadPage page={HealthRecordsPage} />}
        />

      <Route
          path="lesion-tracker"
          element={<LoadPage page={LesionTrackerPage} />}
        />

      <Route
          path="queue"
          element={<LoadPage page={QueuePage} />}
        />

      <Route
          path="outbreak"
          element={<LoadPage page={OutbreakPage} />}
        />

      <Route
          path="/doctors"
          element={<LoadPage page={DoctorsPage} />}
      />

      <Route
          path="/appointments"
          element={<LoadPage page={AppointmentPage} />}
        />
   
      <Route
          path="/appointments/book"
          element={<LoadPage page={AppointmentBookingPage} />}
        />

      <Route
          path="reports"
          element={<LoadPage page={ReportPage} />}
        />

      <Route
          path="reports/:reportId"
          element={<LoadPage page={ReportViewerPage} />}
        />

      <Route
          path="/assistant"
          element={<LoadPage page={AIAssistantPage} />}
        />

      <Route
          path="/queue"
          element={<QueuePage />}
        />

      <Route
          path="/profile"
          element={
              <ProtectedRoute>
                  <LoadPage page={ProfilePage} />
              </ProtectedRoute>
          }
      />

      </Route>


      {/* Doctor Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <DoctorRoute>
            <RouteTransition><LoadPage page={DoctorDashboard} /></RouteTransition>
          </DoctorRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <RouteTransition><LoadPage page={AdminDashboard} /></RouteTransition>
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
