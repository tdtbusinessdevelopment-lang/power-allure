import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Mock user data - replace with actual data from context or props
  const user = {
    name: "Mark",
    company: "TDT POWERSTEEL",
    tagline: "The No. 1 Steel Supplier",
    imageUrl: "https://via.placeholder.com/600", // Replace with actual user image
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col font-sans relative overflow-hidden transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <Header activeTab="PROFILE" />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-5xl bg-charcoal/60 backdrop-blur-xl rounded-3xl border border-gold/20 shadow-gold-lg p-8 md:p-12 lg:p-16 animate-fade-in-slow hover:border-gold/40 transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Left Side: Profile Image */}
            <div className="md:col-span-1 flex justify-center">
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-gold/30 shadow-gold-lg overflow-hidden hover:border-gold/60 hover:shadow-gold transition-all duration-500 group">
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Side: Greeting and Actions */}
            <div className="md:col-span-2 text-center md:text-left space-y-6">
              <div>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent animate-title-entrance leading-tight">
                  Hi, {user.name}
                </h2>
                <p className="text-lg md:text-xl text-gray-300/80 font-light tracking-wide">
                  Welcome to your personal dashboard.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <button
                  onClick={() => navigate("/main")}
                  className="group relative px-8 py-3 bg-gold text-black font-semibold text-base rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-gold-lg"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
                <button
                  onClick={() => navigate("/edit")}
                  className="px-8 py-3 border-2 border-gold/50 text-gold font-semibold text-base rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 border-2 border-gray-500/30 text-gray-300 font-semibold text-base rounded-full hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* User Details Section */}
          <div className="mt-16 pt-10 border-t border-gold/20 text-center space-y-3">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text">
              {user.company}
            </h3>
            <p className="text-sm md:text-base text-gray-400/90 tracking-[0.2em] uppercase font-light">
              {user.tagline}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
