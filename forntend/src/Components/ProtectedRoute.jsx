import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // ✅ If no token, send to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // ✅ If allowedRoles is provided and user exists, check role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}dash`} />;
  }

  // ✅ Otherwise, show the page
  return children;
}
