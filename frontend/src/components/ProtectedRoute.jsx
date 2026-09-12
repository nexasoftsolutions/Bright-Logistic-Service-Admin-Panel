import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminAuthToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
