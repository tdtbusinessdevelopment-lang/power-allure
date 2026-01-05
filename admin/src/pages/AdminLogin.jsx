import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear any stale tokens when login page loads
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const handleLogin = async () => {
    // Validate input
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call the backend admin authentication API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#D8AF7F]">
      {/* Left Section with Black Background and Diagonal Cut */}
      <div
        className="hidden md:flex relative md:w-1/2 h-full bg-black flex-col justify-start pt-20 md:pt-32 md:-ml-36 z-10"
        style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
      >
        <h1 className="text-[#D8AF7F] text-[50px] md:text-[70px] font-bold mb-4 leading-tight px-4 md:px-0">
          Power Allure
        </h1>
        <p className="text-[#D8AF7F] text-xl md:text-2xl px-4 md:px-0">
          Admin Panel
        </p>
        <p className="text-[#D8AF7F] text-lg md:text-xl px-4 md:px-0 mt-2 opacity-80">
          Manage your platform with power.
        </p>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-auto md:absolute md:inset-0 flex md:justify-end justify-center items-center z-0">
        <div className="w-full md:w-1/2 flex flex-col items-center px-4 md:px-0">
          <h2 className="text-black text-3xl md:text-5xl font-bold mb-6 md:mb-8">
            Admin Login
          </h2>
          <div className="w-full max-w-sm md:w-96 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 md:p-5 rounded-xl bg-[#c5c4c4] placeholder-gray-600 text-black text-base md:text-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full p-4 md:p-5 rounded-xl bg-[#c5c4c4] placeholder-gray-600 text-black text-base md:text-lg focus:outline-none"
            />
            {error && (
              <div className="text-red-600 text-sm font-semibold text-center bg-red-100 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 md:mt-8 px-10 md:px-12 py-3 md:py-4 text-lg md:text-xl rounded-full bg-[#c5c4c4] text-black font-semibold transition-colors hover:bg-[#b0afaf] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
