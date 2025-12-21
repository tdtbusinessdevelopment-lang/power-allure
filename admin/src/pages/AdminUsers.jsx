import React, { useState } from "react";

const AdminUsers = () => {
  const themeColor = "#d6b48e";
  const [selectedUser, setSelectedUser] = useState(null);

  // Placeholder user data
  const users = [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      joined: "2024-01-15",
      favoritesCount: 8,
      favorites: ["Maria Santos", "Emma Johnson", "Isabella Cruz"],
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      joined: "2024-02-20",
      favoritesCount: 12,
      favorites: ["Olivia Smith", "Sofia Reyes", "Ava Williams"],
    },
    {
      id: 3,
      username: "bob_wilson",
      email: "bob@example.com",
      joined: "2024-03-10",
      favoritesCount: 5,
      favorites: ["Carmen Lopez", "Luna Brown"],
    },
    {
      id: 4,
      username: "alice_brown",
      email: "alice@example.com",
      joined: "2024-04-05",
      favoritesCount: 15,
      favorites: ["Maria Santos", "Emma Johnson", "Olivia Smith"],
    },
    {
      id: 5,
      username: "charlie_davis",
      email: "charlie@example.com",
      joined: "2024-05-12",
      favoritesCount: 3,
      favorites: ["Isabella Cruz", "Sofia Reyes"],
    },
  ];

  return (
    <div className="min-h-screen bg-black p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: themeColor }}
          >
            User Management
          </h1>
          <p className="text-gray-400">View and manage all registered users</p>
        </div>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-3 rounded-full bg-gray-900 border text-white outline-none focus:ring-2"
          style={{ borderColor: themeColor, focusRingColor: themeColor }}
        />
      </div>

      {/* Users Table */}
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
                  User ID
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Username
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Email
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Joined Date
                </th>
                <th
                  className="text-left p-4 font-semibold"
                  style={{ color: themeColor }}
                >
                  Favorites
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-800 hover:bg-gray-900 hover:bg-opacity-30 transition-all"
                >
                  <td className="p-4 text-white">#{user.id}</td>
                  <td className="p-4 text-white font-semibold">
                    {user.username}
                  </td>
                  <td className="p-4 text-white">{user.email}</td>
                  <td className="p-4 text-white">{user.joined}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">❤️</span>
                      <span className="text-white font-semibold">
                        {user.favoritesCount}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="px-4 py-2 rounded-lg border text-white text-sm font-semibold transition-all hover:text-black"
                      style={{ borderColor: themeColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = themeColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-black border rounded-3xl p-8 max-w-2xl w-full"
            style={{ borderColor: themeColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{ color: themeColor }}>
                User Details
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-white hover:text-red-500 text-3xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            {/* User Info */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white text-xl font-semibold">
                  {selectedUser.username}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white text-lg">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Joined Date</p>
                <p className="text-white text-lg">{selectedUser.joined}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  Favorite Models ({selectedUser.favoritesCount})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.favorites.map((favorite, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-black text-sm font-semibold"
                      style={{ backgroundColor: themeColor }}
                    >
                      {favorite}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-full border text-white font-semibold transition-all hover:text-black"
                style={{ borderColor: themeColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Edit User
              </button>
              <button className="flex-1 py-3 rounded-full border border-red-500 text-red-500 font-semibold transition-all hover:bg-red-500 hover:text-white">
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
