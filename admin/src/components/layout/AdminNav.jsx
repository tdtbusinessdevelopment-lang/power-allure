import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  const themeColor = "#d6b48e";

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/users", label: "Users", icon: "👥" },
    { path: "/models", label: "Models", icon: "✨" },
    { path: "/bookings", label: "Bookings", icon: "📅" },
    { path: "/upload", label: "Upload", icon: "⬆️" },
  ];

  return (
    <nav
      className="h-screen w-64 bg-black border-r flex flex-col"
      style={{ borderColor: themeColor }}
    >
      {/* Logo/Title */}
      <div className="p-6 border-b" style={{ borderColor: themeColor }}>
        <h1 className="text-2xl font-bold" style={{ color: themeColor }}>
          Power Allure
        </h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-all ${
                isActive
                  ? "text-black font-semibold"
                  : "text-white hover:text-black"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? themeColor : "transparent",
            })}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t" style={{ borderColor: themeColor }}>
        <button
          onClick={() => {
            // Logout functionality will be added later
            window.location.href = "/login";
          }}
          className="w-full py-2 rounded-full border text-white font-semibold transition-all hover:text-black"
          style={{ borderColor: themeColor }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = themeColor;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
