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

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route (no layout) */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin routes (with layout) */}
        <Route path="/" element={<AdminLayout />}>
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
