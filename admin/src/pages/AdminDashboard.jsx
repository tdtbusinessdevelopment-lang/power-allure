import React from "react";

const AdminDashboard = () => {
  const themeColor = "#d6b48e";

  const stats = [
    { label: "Total Users", value: "247", icon: "👥", change: "+12%" },
    { label: "Total Models", value: "89", icon: "✨", change: "+5%" },
    { label: "Total Bookings", value: "1,234", icon: "📅", change: "+18%" },
    { label: "Active Models", value: "76", icon: "🟢", change: "+3%" },
  ];

  const recentActivities = [
    { time: "10 mins ago", action: "New user registered: john_doe" },
    { time: "25 mins ago", action: "Model uploaded: Sarah Anderson" },
    { time: "1 hour ago", action: "Booking confirmed: Model #12345" },
    { time: "2 hours ago", action: "User updated favorites" },
    { time: "3 hours ago", action: "New booking request received" },
  ];

  const quickActions = [
    { label: "Add New Model", icon: "➕", path: "/upload" },
    { label: "View All Bookings", icon: "📋", path: "/bookings" },
    { label: "Manage Users", icon: "👥", path: "/users" },
    { label: "Model Gallery", icon: "🖼️", path: "/models" },
  ];

  return (
    <div className="min-h-screen bg-black p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: themeColor }}
        >
          Dashboard
        </h1>
        <p className="text-gray-400">Welcome to Power Allure Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-black border rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-xl"
            style={{ borderColor: themeColor }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <span className="text-green-400 text-sm font-semibold">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed - Takes 2 columns */}
        <div
          className="lg:col-span-2 bg-black border rounded-2xl p-6"
          style={{ borderColor: themeColor }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-900 bg-opacity-30 transition-all hover:bg-opacity-50"
              >
                <div
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeColor }}
                ></div>
                <div className="flex-1">
                  <p className="text-white">{activity.action}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div
          className="bg-black border rounded-2xl p-6"
          style={{ borderColor: themeColor }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => (window.location.href = action.path)}
                className="w-full p-4 rounded-xl border text-white font-semibold transition-all hover:text-black text-left flex items-center gap-3"
                style={{ borderColor: themeColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="text-2xl">{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
