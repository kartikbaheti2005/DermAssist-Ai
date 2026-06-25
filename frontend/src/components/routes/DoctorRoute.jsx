import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DoctorRoute = ({ children }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default DoctorRoute;