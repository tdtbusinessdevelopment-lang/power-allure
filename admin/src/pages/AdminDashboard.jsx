import React, { useState, useEffect } from "react";
import API_URL from "../config/api";

const AdminDashboard = () => {
  const themeColor = "#d6b48e";

  // State for stats
  const [stats, setStats] = useState([
    { label: "Total Users", value: "...", icon: "👥", change: "" },
    { label: "Total Models", value: "...", icon: "✨", change: "" },
    { label: "Total Bookings", value: "—", icon: "📅", change: "Coming Soon" },
    { label: "Active Models", value: "...", icon: "🟢", change: "" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch dashboard stats and activity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch(`${API_URL}/api/dashboard/stats`),
          fetch(`${API_URL}/api/dashboard/activity`),
        ]);

        const statsData = await statsRes.json();
        const activityData = await activityRes.json();

        if (statsData.success) {
          setStats([
            {
              label: "Total Users",
              value: statsData.stats.totalUsers.toString(),
              icon: "👥",
              change: "",
            },
            {
              label: "Total Models",
              value: statsData.stats.totalModels.toString(),
              icon: "✨",
              change: `Local: ${statsData.stats.totalLocalModels} | Foreign: ${statsData.stats.totalForeignModels}`,
            },
            {
              label: "Total Bookings",
              value: statsData.stats.totalBookings?.toString() || "0",
              icon: "📅",
              change: `Pending: ${
                statsData.stats.pendingBookings || 0
              } | Confirmed: ${statsData.stats.confirmedBookings || 0}`,
            },
            {
              label: "Active Models",
              value: statsData.stats.activeModels.toString(),
              icon: "🟢",
              change: `Local: ${statsData.stats.activeLocalModels} | Foreign: ${statsData.stats.activeForeignModels}`,
            },
          ]);
        }

        if (activityData.success) {
          setRecentActivities(
            activityData.activities.map((activity) => ({
              time: formatTimeAgo(new Date(activity.time)),
              action: activity.action,
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const quickActions = [
    { label: "Add New Model", icon: "➕", path: "/upload" },
    { label: "View All Models", icon: "🖼️", path: "/models" },
    { label: "Manage Users", icon: "👥", path: "/users" },
    { label: "Manage Bookings", icon: "📅", path: "/bookings" },
  ];

  return (
    <div className="min-h-screen bg-black p-6 md:p-8 animate-fade-in">
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
              {stat.change && (
                <span className="text-gray-400 text-xs font-semibold">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions - Takes full width since activity is removed */}
        <div
          className="lg:col-span-3 bg-black border rounded-2xl p-6"
          style={{ borderColor: themeColor }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => (window.location.href = action.path)}
                className="p-6 rounded-xl border text-white font-semibold transition-all hover:text-black hover:scale-105 flex flex-col items-center gap-3 text-center"
                style={{ borderColor: themeColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="text-4xl mb-2">{action.icon}</span>
                <span className="text-lg">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
