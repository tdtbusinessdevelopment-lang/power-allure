import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col animate-fade-in">
      {/* Brand Header */}
      <header className="w-full py-8 text-center">
        <h1 className="text-[#C5A27D] text-2xl font-semibold tracking-widest uppercase">
          Power Allure
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 md:px-20 lg:px-32 gap-12 md:gap-20">
        {/* Left Side: Greeting and Action Buttons */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-6xl md:text-8xl font-bold mb-10 tracking-tight">
            Hi, I’m Mark.
          </h2>

          <div className="flex items-center">
            {/* Edit Profile Button */}
            <button
              onClick={() => navigate("/edit")}
              className="bg-[#3A3A3A] hover:bg-[#4A4A4A] text-[#C5A27D] px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Edit Profile
            </button>

            {/* The Bridge Line */}
            <div className="w-6 h-[1px] bg-[#3A3A3A]"></div>

            {/* Home Button */}
            <button
              onClick={() => navigate("/main")}
              className="bg-[#3A3A3A] hover:bg-[#4A4A4A] text-[#C5A27D] px-8 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Home
            </button>

            {/* The Bridge Line */}
            <div className="w-6 h-[1px] bg-[#3A3A3A]"></div>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="bg-[#3A3A3A] hover:bg-[#4A4A4A] text-[#C5A27D] px-8 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right Side: Circular Profile Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border-[3px] border-[#C5A27D] overflow-hidden">
            <img
              src="https://via.placeholder.com/600" // Replace with your image asset
              alt="Mark"
              className="w-full h-full object-cover"
            />

            {/* Bottom Overlay inside Circle */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end pb-10">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                  TDT <span className="text-[#C5A27D]">POWER</span>STEEL
                </p>
                <p className="text-[10px] md:text-xs text-gray-400 tracking-[0.3em] uppercase">
                  The No. 1 Steel Supplier
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Your Footer component would be imported and placed here */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
