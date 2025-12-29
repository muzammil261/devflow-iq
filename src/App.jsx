import { Routes, Route } from "react-router-dom";

import HomePage from "./Components/HomePage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import RoleSelect from "./Components/RoleSelectPage.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";
import ManagerDashboard from "./Components/ManagerDashboard.jsx";
import DeveloperDashboard from "./Components/DeveloperDashboard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import AboutPage from "./Components/AboutPage.jsx";
import TechStackPage from "./Components/TechStackPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Register Flow */}
      <Route path="/register" element={<RoleSelect />} />
      <Route path="/register/:role" element={<RegisterPage />} />

      {/* Dashboards */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developer"
        element={
          <ProtectedRoute allowedRoles={["developer"]}>
            <DeveloperDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/techstack" element={<TechStackPage />} />
    </Routes>
  );
}

export default App;
