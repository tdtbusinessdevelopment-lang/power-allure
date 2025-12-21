import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar Navigation */}
      <AdminNav />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
