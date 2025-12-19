import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute check - Token exists:", !!token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
