import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Theme colors extracted from image
  const goldColor = "text-[#D8AF7F]"; // The text color
  const goldBg = "bg-[#D8AF7F]"; // The search bar background
  const navBarBg = "bg-[#4F4949]"; // The dark brown/grey pill background

  const handleTabClick = (tab) => {
    // If we're not on the main page, navigate to it with the selected tab
    if (location.pathname !== "/main") {
      navigate("/main", { state: { activeTab: tab } });
    } else if (onTabChange) {
      // If we're already on main page, just update the tab
      onTabChange(tab);
    }
  };

  return (
    // Outer Container (Black Background)
    <div className="w-full bg-black flex justify-center">
      {/* Inner "Pill" Navbar */}
      <div
        className={`${navBarBg} w-full rounded-lg h-20 flex items-center justify-between px-4 shadow-lg`}
      >
        {/* --- LEFT SECTION: Local/Foreign/Favorites --- */}
        <div className="flex-1 flex items-center gap-4 text-sm font-medium">
          <span
            onClick={() => handleTabClick("LOCAL")}
            className="cursor-pointer hover:text-white transition-colors text-2xl"
            style={{ color: activeTab === "LOCAL" ? "#dcb886" : "#d1d5db" }}
          >
            Local
          </span>
          <span
            onClick={() => handleTabClick("FOREIGN")}
            className="cursor-pointer hover:text-white transition-colors text-2xl"
            style={{ color: activeTab === "FOREIGN" ? "#dcb886" : "#d1d5db" }}
          >
            Foreign
          </span>
        </div>

        {/* --- CENTER SECTION: Logo --- */}
        <div className="flex-1 flex justify-center">
          <h1
            className={`${goldColor} text-4xl font-bold tracking-wide whitespace-nowrap`}
          >
            Power Allure
          </h1>
        </div>

        {/* --- RIGHT SECTION: Search & Nav --- */}
        <div className="flex-1 flex items-center justify-end gap-5">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className={`${goldBg} text-black placeholder-black/70 text-xs font-medium rounded-full py-1.5 pl-3 pr-8 w-42 md:w-52 focus:outline-none focus:ring-1 focus:ring-white transition-all`}
            />
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w- absolute right-3 top-1/2 transform -translate-y-1/2 text-black/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Right Links */}
          
          <nav className="flex items-center gap-5">
             <span
            onClick={() => handleTabClick("FAVORITES")}
            className="cursor-pointer hover:text-white transition-colors text-2xl"
            style={{ color: activeTab === "FAVORITES" ? "#dcb886" : "#d1d5db" }}
          >
            Favorites
          </span>
            <span
              onClick={() => navigate("/profile")}
             className="cursor-pointer hover:text-white transition-colors text-2xl"
            style={{ color: activeTab === "PROFILE" ? "#dcb886" : "#d1d5db" }}
           >
              Profile
            </span>
            
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
