import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      // If no token or user, redirect to login
      if (!token || !userString) {
        setIsValid(false);
        setLoading(false);
        return;
      }

      // Validate that user data is valid JSON
      try {
        const user = JSON.parse(userString);

        if (!user || typeof user !== "object") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsValid(false);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsValid(false);
        setLoading(false);
        return;
      }

      // Validate session with backend
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/auth/validate-session`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.success && !data.sessionInvalidated) {
          // Session is valid
          setIsValid(true);
        } else {
          // Session has been invalidated
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsValid(false);
        }
      } catch (error) {
        console.error("Session validation error:", error);
        // On network error, clear session for security
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsValid(false);
      }

      setLoading(false);
    };

    validateSession();
  }, []);

  // Show loading state while validating
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#000",
        }}
      >
        <div style={{ color: "#D8AF7F", fontSize: "20px" }}>
          Validating session...
        </div>
      </div>
    );
  }

  // If session is not valid, redirect to login
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated and valid, render the protected component
  return children;
};

export default ProtectedRoute;
