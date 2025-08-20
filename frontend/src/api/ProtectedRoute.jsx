import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now() || decoded.role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  } catch {
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;

