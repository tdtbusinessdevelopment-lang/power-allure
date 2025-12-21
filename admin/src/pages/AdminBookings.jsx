import React, { useState, useEffect } from "react";
import BookingCalendar from "../components/BookingCalendar";

const AdminBookings = () => {
  const themeColor = "#d6b48e";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] = useState("All Models");

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view bookings");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        setError("Server error: Invalid response format");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setBookings(data.bookings || []);
        setError(""); // Clear any errors
      } else {
        setError(data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(`Error loading bookings: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        // Refresh bookings
        fetchBookings();
      } else {
        alert("Failed to update booking status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating booking status");
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Refresh bookings
        fetchBookings();
      } else {
        alert("Failed to delete booking");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Error deleting booking");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Extract unique model names for filter
  const uniqueModels = [
    "All Models",
    ...new Set(bookings.map((b) => b.modelName)),
  ];

  // Filter bookings for calendar
  const filteredBookings =
    selectedModel === "All Models"
      ? bookings
      : bookings.filter((b) => b.modelName === selectedModel);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 md:p-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 md:p-8 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: themeColor }}
          >
            Booking Management
          </h1>
          <p className="text-gray-400">
            View and manage all bookings ({bookings.length} total)
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">{error}</div>
      )}

      {/* Bookings Table */}
      <div
        className="bg-black border rounded-2xl overflow-hidden mb-12"
        style={{ borderColor: themeColor }}
      >
        <div className="overflow-x-auto">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-xl mb-2">No bookings yet</p>
              <p className="text-sm">
                Bookings will appear here once users make reservations
              </p>
            </div>
          ) : (
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
                    Client Name
                  </th>
                  <th
                    className="text-left p-4 font-semibold"
                    style={{ color: themeColor }}
                  >
                    Company
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
                    Category
                  </th>
                  <th
                    className="text-left p-4 font-semibold"
                    style={{ color: themeColor }}
                  >
                    Event
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
                    key={booking._id}
                    className="border-b border-gray-800 hover:bg-gray-900 hover:bg-opacity-30 transition-all"
                  >
                    <td className="p-4 text-white">#{booking._id.slice(-6)}</td>
                    <td className="p-4 text-white">{booking.userName}</td>
                    <td className="p-4 text-white">{booking.company}</td>
                    <td className="p-4 text-white">{booking.modelName}</td>
                    <td className="p-4 text-white capitalize">
                      {booking.modelCategory || "Local"}
                    </td>
                    <td className="p-4 text-white">{booking.event}</td>
                    <td className="p-4 text-white">{booking.eventDate}</td>
                    <td className="p-4 text-white">{booking.eventTime}</td>
                    <td className="p-4">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          updateBookingStatus(booking._id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="px-3 py-1 rounded-lg border border-red-500 text-red-500 text-sm font-semibold transition-all hover:bg-red-500 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Calendar Section with Filter */}
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
            Calendar Schedule
          </h2>

          <div className="mt-2 md:mt-0">
            <label className="text-gray-400 mr-2 text-sm">
              Filter by Model:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[themeColor]"
              style={{
                borderColor: themeColor,
              }}
            >
              {uniqueModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        <BookingCalendar bookings={filteredBookings} themeColor={themeColor} />
      </div>
    </div>
  );
};

export default AdminBookings;
