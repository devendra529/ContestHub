// client/src/routes/ProtectedRoute.jsx

import { Navigate }  from "react-router-dom";
import { useAuth }   from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center
                       bg-gray-50 dark:bg-dark-200">
        <div className="h-10 w-10 rounded-full border-4
                        border-gray-200 dark:border-gray-700
                        border-t-primary-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

