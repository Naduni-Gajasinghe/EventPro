// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // ❌ No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ Token exists → allow access
  return children;
}
