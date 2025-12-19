import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const EditPage = () => {
  // State to handle the toggle between the "Hi Mark" view and "Edit" view
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Header Brand */}
      <header className="w-full py-8 text-center">
        <h1 className="text-[#C5A27D] text-2xl font-semibold tracking-widest uppercase">
          Power Allure
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-6 lg:px-32 gap-12 lg:gap-24">
        {/* Left Side: Navigation & Form */}
        <div className="flex-1 flex flex-col items-center lg:items-start w-full max-w-md">
          {/* Top Toggle Buttons */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setIsEditing(true)}
              className={`${
                isEditing
                  ? "bg-[#D9B992] text-black"
                  : "bg-[#3A3A3A] text-[#C5A27D]"
              } px-6 py-2 rounded-full text-sm font-bold transition-all`}
            >
              Edit Profile
            </button>
            <div className="w-6 h-[1px] bg-[#3A3A3A]"></div>
            <button
              onClick={() => navigate("/main")}
              className="bg-[#3A3A3A] hover:bg-[#4A4A4A] text-[#C5A27D] px-8 py-2 rounded-full text-sm font-medium transition-all"
            >
              Home
            </button>
          </div>

          {/* Edit Form Card */}
          <div className="bg-[#D9B992] rounded-[30px] p-10 w-full text-black shadow-xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="block font-bold text-sm ml-1">
                  Edit Name
                </label>
                <input
                  type="text"
                  placeholder="Edit Name"
                  className="w-full bg-[#C5A27D] border-none rounded-2xl p-4 placeholder:text-black/30 focus:ring-2 focus:ring-black/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-sm ml-1">
                  Update Email
                </label>
                <input
                  type="email"
                  placeholder="Update Email"
                  className="w-full bg-[#C5A27D] border-none rounded-2xl p-4 placeholder:text-black/30 focus:ring-2 focus:ring-black/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-sm ml-1">
                  Update Password
                </label>
                <input
                  type="password"
                  placeholder="Update Password"
                  className="w-full bg-[#C5A27D] border-none rounded-2xl p-4 placeholder:text-black/30 focus:ring-2 focus:ring-black/20 outline-none transition-all"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full border-[4px] border-[#C5A27D] overflow-hidden shadow-2xl">
            <img
              src="/mark-profile.jpg" // Your image source
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end pb-12">
              <p className="text-xl lg:text-3xl font-bold text-white tracking-tighter">
                TDT <span className="text-[#C5A27D]">POWER</span>STEEL
              </p>
              <p className="text-[10px] lg:text-xs text-gray-400 tracking-[0.4em] uppercase font-light">
                The No. 1 Steel Supplier
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPage;
