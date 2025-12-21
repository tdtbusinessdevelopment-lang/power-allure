import React, { useState } from "react";

const AdminBookings = () => {
  const themeColor = "#d6b48e";

  // Placeholder booking data
  const bookings = [
    {
      id: 1,
      user: "john_doe",
      model: "Maria Santos",
      date: "2025-12-25",
      time: "14:00",
      status: "confirmed",
    },
    {
      id: 2,
      user: "jane_smith",
      model: "Emma Johnson",
      date: "2025-12-26",
      time: "16:00",
      status: "pending",
    },
    {
      id: 3,
      user: "bob_wilson",
      model: "Isabella Cruz",
      date: "2025-12-27",
      time: "10:00",
      status: "completed",
    },
    {
      id: 4,
      user: "alice_brown",
      model: "Olivia Smith",
      date: "2025-12-28",
      time: "15:00",
      status: "confirmed",
    },
    {
      id: 5,
      user: "charlie_davis",
      model: "Sofia Reyes",
      date: "2025-12-29",
      time: "11:00",
      status: "pending",
    },
    {
      id: 6,
      user: "diana_martinez",
      model: "Ava Williams",
      date: "2025-12-30",
      time: "13:00",
      status: "confirmed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: themeColor }}
          >
            Booking Management
          </h1>
          <p className="text-gray-400">View and manage all bookings</p>
        </div>
        <button
          className="px-6 py-3 rounded-full font-semibold transition-all text-black"
          style={{ backgroundColor: themeColor }}
        >
          ➕ Create Booking
        </button>
      </div>

      {/* Bookings Table */}
      <div
        className="bg-black border rounded-2xl overflow-hidden"
        style={{ borderColor: themeColor }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: themeColor }}>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Booking ID
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  User
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Model
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Date
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Time
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Status
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-800 hover:bg-gray-900 hover:bg-opacity-30 transition-all"
                >
                  <td className="p-4 text-white">#{booking.id}</td>
                  <td className="p-4 text-white">{booking.user}</td>
                  <td className="p-4 text-white">{booking.model}</td>
                  <td className="p-4 text-white">{booking.date}</td>
                  <td className="p-4 text-white">{booking.time}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded-lg border text-white text-sm font-semibold transition-all hover:text-black"
                        style={{ borderColor: themeColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = themeColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 rounded-lg border text-white text-sm font-semibold transition-all hover:text-black"
                        style={{ borderColor: themeColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = themeColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calendar placeholder */}
      <div className="mt-8">
        <div
          className="bg-black border rounded-2xl p-8 text-center"
          style={{ borderColor: themeColor }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>
            Calendar View
          </h2>
          <p className="text-gray-400">
            Calendar visualization will be implemented here
          </p>
          <div className="mt-6 h-64 flex items-center justify-center border border-dashed border-gray-700 rounded-xl">
            <span className="text-6xl opacity-30">📅</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
