import React, { useState, useEffect } from "react";

const AdminBookings = () => {
  const themeColor = "#d6b48e";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 md:p-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading bookings...</p>
      </div>
    );
  }

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
        className="bg-black border rounded-2xl overflow-hidden"
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
