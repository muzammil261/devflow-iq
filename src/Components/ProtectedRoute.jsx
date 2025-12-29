import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role not allowed
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
