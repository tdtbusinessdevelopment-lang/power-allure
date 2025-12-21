import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BookingCalendar = ({ bookings, themeColor = "#d6b48e" }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Transform bookings to calendar events
  const events = bookings.map((booking) => {
    // Combine date and time to create start/end Date objects
    // Assuming eventDate is "YYYY-MM-DD" and eventTime is "HH:MM"
    const startDateTime = new Date(`${booking.eventDate}T${booking.eventTime}`);
    // Default duration of 2 hours if not specified
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    return {
      id: booking._id,
      title: `${booking.modelName} - ${booking.event}`,
      start: startDateTime,
      end: endDateTime,
      resource: booking,
    };
  });

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "#6b7280"; // Default gray

    switch (event.resource.status) {
      case "confirmed":
        backgroundColor = "#10b981"; // Green
        break;
      case "pending":
        backgroundColor = "#eab308"; // Yellow
        break;
      case "completed":
        backgroundColor = "#3b82f6"; // Blue
        break;
      case "cancelled":
        backgroundColor = "#ef4444"; // Red
        break;
      default:
        break;
    }

    const style = {
      backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    return {
      style,
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div
      className="p-4 rounded-xl h-[700px] relative text-white"
      style={{
        backgroundColor: "#000000",
        border: `1px solid ${themeColor}`,
      }}
    >
      <style>
        {`
          .rbc-calendar {
            color: #fff;
          }
          .rbc-off-range-bg {
            background-color: #1a1a1a;
          }
          .rbc-today {
            background-color: #333333;
          }
          .rbc-header {
            color: ${themeColor};
            border-bottom: 1px solid ${themeColor};
            font-weight: bold;
          }
          .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
            border: 1px solid #333;
          }
          .rbc-day-bg + .rbc-day-bg {
            border-left: 1px solid #333;
          }
          .rbc-month-row + .rbc-month-row {
            border-top: 1px solid #333;
          }
          .rbc-day-slot .rbc-time-slot {
            border-top: 1px solid #333;
          }
          .rbc-timeslot-group {
            border-bottom: 1px solid #333;
          }
          .rbc-day-slot .rbc-events-container {
            margin-right: 10px;
          }
          .rbc-event {
            background-color: ${themeColor};
          }
          .rbc-current-time-indicator {
            background-color: ${themeColor};
          }
          .rbc-toolbar button {
            color: white;
            border: 1px solid ${themeColor};
            border-radius: 4px;
          }
          .rbc-toolbar button:hover {
            background-color: ${themeColor};
            color: black;
          }
          .rbc-toolbar button.rbc-active {
            background-color: ${themeColor};
            color: black;
            box-shadow: none;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "day", "agenda"]}
      />

      {/* Simple Modal for Event Details */}
      {selectedEvent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 rounded-xl backdrop-blur-sm">
          <div
            className="bg-black text-white p-6 rounded-lg max-w-sm w-full shadow-2xl"
            style={{ border: `1px solid ${themeColor}` }}
          >
            <h3
              className="text-xl font-bold mb-4 border-b pb-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Booking Details
            </h3>
            <div className="space-y-2 mb-6">
              <p>
                <span className="text-gray-400">Client:</span>{" "}
                {selectedEvent.resource.userName}
              </p>
              <p>
                <span className="text-gray-400">Company:</span>{" "}
                {selectedEvent.resource.company}
              </p>
              <p>
                <span className="text-gray-400">Model:</span>{" "}
                {selectedEvent.resource.modelName}
              </p>
              <p>
                <span className="text-gray-400">Event:</span>{" "}
                {selectedEvent.resource.event}
              </p>
              <p>
                <span className="text-gray-400">Date:</span>{" "}
                {selectedEvent.resource.eventDate}
              </p>
              <p>
                <span className="text-gray-400">Time:</span>{" "}
                {selectedEvent.resource.eventTime}
              </p>
              <p>
                <span className="text-gray-400">Status:</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded text-xs uppercase font-bold
                  ${
                    selectedEvent.resource.status === "confirmed"
                      ? "bg-green-500"
                      : selectedEvent.resource.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : selectedEvent.resource.status === "completed"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                >
                  {selectedEvent.resource.status}
                </span>
              </p>
            </div>
            <div className="text-right">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
