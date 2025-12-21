import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminModels from "./pages/AdminModels";
import AdminBookings from "./pages/AdminBookings";
import AdminUpload from "./pages/AdminUpload";

// Import layout
import AdminLayout from "./components/layout/AdminLayout";

// Import protected route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route (no layout, not protected) */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin routes (with layout and protection) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="models" element={<AdminModels />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="upload" element={<AdminUpload />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
