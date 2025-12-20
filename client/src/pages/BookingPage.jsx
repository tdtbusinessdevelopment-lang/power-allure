import React, { useState } from "react";
import Header from "../components/LandingHeader";

const BookingPage = () => {
  const themeColor = "#dcb887";
  const [activeTab, setActiveTab] = useState("LOCAL");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    event: "",
    eventDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Booking request submitted!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 md:p-8">
        <div
          className="w-full max-w-6xl rounded-3xl p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 items-center"
          style={{ backgroundColor: "#4e4847" }}
        >
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
            <p
              className="text-xs md:text-sm uppercase tracking-wider italic"
              style={{ color: themeColor }}
            >
              WE'RE HERE TO ELEVATE YOUR EXPERIENCE
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="italic" style={{ color: themeColor }}>
                Discuss
              </span>{" "}
              <span className="text-white">Your Needs.</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed italic">
              Looking for professional PR models tailored to your brand, event,
              or campaign?
            </p>

            <p
              className="text-base md:text-lg leading-relaxed italic"
              style={{ color: themeColor }}
            >
              Reach out to Power Allure and let us deliver elegance, discretion,
              and excellence.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2">
            <div
              className="rounded-3xl p-6 md:p-8 shadow-lg"
              style={{ backgroundColor: themeColor }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="James Smith"
                    className="w-full px-4 py-3 rounded-full bg-[#c9a876] border-none focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-700 placeholder-gray-600"
                    required
                  />
                </div>

                {/* Company Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="TDT Powerseed"
                    className="w-full px-4 py-3 rounded-full bg-[#c9a876] border-none focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-700 placeholder-gray-600"
                    required
                  />
                </div>

                {/* Event Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event
                  </label>
                  <input
                    type="text"
                    name="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    placeholder="Event"
                    className="w-full px-4 py-3 rounded-full bg-[#c9a876] border-none focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-700 placeholder-gray-600"
                    required
                  />
                </div>

                {/* Event Date Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full bg-[#c9a876] border-none focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-700 placeholder-gray-600"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#4e4847] text-white px-10 py-3 rounded-full font-semibold hover:bg-[#3a3534] transition-colors duration-300 shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
