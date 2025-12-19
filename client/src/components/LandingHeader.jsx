import React from "react";
import { NavLink, Link } from "react-router-dom";

const LandingHeader = () => {
  // Common text color style to reuse
  const themeBg = "bg-[#deb887]";

  return (
    <header className="sticky top-0 z-50 bg-black p-6 flex justify-between items-center">
      <nav className="flex items-center space-x-8 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-full font-bold transition-colors ${
              isActive
                ? `${themeBg} text-black`
                : "text-white hover:text-opacity-80"
            }`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2 rounded-full font-bold transition-colors ${
              isActive
                ? `${themeBg} text-black`
                : "text-white hover:text-opacity-80"
            }`
          }
        >
          ABOUT US
        </NavLink>
      </nav>
      <Link
        to="/login"
        className="px-4 py-2 rounded-full font-bold text-white hover:text-[#deb887] transition-colors"
      >
        Login
      </Link>
    </header>
  );
};

export default LandingHeader;
