import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if admin token exists in localStorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Optionally, you can add additional validation here
  // For example, verify the token format or check user role

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
