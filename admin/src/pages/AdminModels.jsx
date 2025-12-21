import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api";

const AdminModels = () => {
  const themeColor = "#d6b48e";
  const [activeTab, setActiveTab] = useState("local");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingModel, setEditingModel] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    description: "",
    available: true,
    favoritesCount: 0,
  });

  // Fetch models from database
  const fetchModels = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "local" ? "/models/local" : "/models/foreign";
      const response = await axios.get(`${API_URL}${endpoint}`);
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
      alert("Failed to load models");
    } finally {
      setLoading(false);
    }
  };

  // Fetch models when tab changes
  useEffect(() => {
    fetchModels();
  }, [activeTab]);

  // Open edit modal
  const handleEdit = (model) => {
    setEditingModel(model);
    setFormData({
      name: model.name || "",
      age: model.age || "",
      height: model.height || "",
      weight: model.weight || "",
      description: model.description || "",
      available: model.available !== undefined ? model.available : true,
      favoritesCount: model.favoritesCount || 0,
    });
    setShowEditModal(true);
  };

  // Save changes
  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/models/${editingModel._id}`, formData);
      alert("Model updated successfully!");
      setShowEditModal(false);
      setEditingModel(null);
      fetchModels(); // Refresh the list
    } catch (error) {
      console.error("Error updating model:", error);
      alert("Failed to update model");
    }
  };

  // Delete model
  const handleDelete = async (modelId, modelName) => {
    if (!confirm(`Are you sure you want to delete "${modelName}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/models/${modelId}`);
      alert("Model deleted successfully!");
      fetchModels(); // Refresh the list
    } catch (error) {
      console.error("Error deleting model:", error);
      alert("Failed to delete model");
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: themeColor }}
        >
          Model Management
        </h1>
        <p className="text-gray-400">
          View and manage all models in your platform
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("local")}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeTab === "local" ? "text-black" : "text-white border"
          }`}
          style={{
            backgroundColor: activeTab === "local" ? themeColor : "transparent",
            borderColor: themeColor,
          }}
        >
          Local Models
        </button>
        <button
          onClick={() => setActiveTab("foreign")}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeTab === "foreign" ? "text-black" : "text-white border"
          }`}
          style={{
            backgroundColor:
              activeTab === "foreign" ? themeColor : "transparent",
            borderColor: themeColor,
          }}
        >
          Foreign Models
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-white text-xl">Loading models...</div>
        </div>
      ) : models.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-400 text-xl">
              No models found in this collection
            </p>
            <p className="text-gray-500 mt-2">
              Upload models using the Upload page
            </p>
          </div>
        </div>
      ) : (
        /* Models Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <div
              key={model._id}
              className="bg-black border rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
              style={{ borderColor: themeColor }}
            >
              {/* Model Image */}
              <div className="w-full h-80 bg-gray-800">
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Model Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {model.name}
                </h3>

                {/* Stats Row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">❤️</span>
                    <span className="text-gray-400 text-sm">
                      {model.favoritesCount || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        model.available ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    <span className="text-gray-400 text-sm">
                      {model.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(model)}
                    className="flex-1 py-2 rounded-lg border text-white text-sm font-semibold transition-all hover:text-black"
                    style={{ borderColor: themeColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = themeColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(model._id, model.name)}
                    className="flex-1 py-2 rounded-lg border border-red-500 text-red-500 text-sm font-semibold transition-all hover:bg-red-500 hover:text-white"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingModel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-black border rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{ borderColor: themeColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{ color: themeColor }}>
                Edit Model
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white hover:text-red-500 text-3xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image Preview */}
              <div>
                <div
                  className="border-2 rounded-2xl overflow-hidden mb-4"
                  style={{ borderColor: themeColor }}
                >
                  <img
                    src={editingModel.imageUrl}
                    alt={editingModel.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
                <p className="text-gray-400 text-sm">
                  Model ID: {editingModel._id}
                </p>
              </div>

              {/* Right Column - Edit Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm block mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-2 rounded-xl p-3 text-white outline-none focus:border-opacity-100 transition-all"
                    style={{ borderColor: themeColor }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-white text-sm block mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full bg-transparent border-2 rounded-xl p-3 text-white outline-none focus:border-opacity-100 transition-all"
                      style={{ borderColor: themeColor }}
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm block mb-2">
                      Weight
                    </label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      className="w-full bg-transparent border-2 rounded-xl p-3 text-white outline-none focus:border-opacity-100 transition-all"
                      style={{ borderColor: themeColor }}
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm block mb-2">
                      Height
                    </label>
                    <input
                      type="text"
                      value={formData.height}
                      onChange={(e) =>
                        setFormData({ ...formData, height: e.target.value })
                      }
                      className="w-full bg-transparent border-2 rounded-xl p-3 text-white outline-none focus:border-opacity-100 transition-all"
                      style={{ borderColor: themeColor }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm block mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="4"
                    className="w-full bg-transparent border-2 rounded-xl p-3 text-white outline-none focus:border-opacity-100 transition-all resize-none"
                    style={{ borderColor: themeColor }}
                  />
                </div>

                <div>
                  <label className="text-white text-sm block mb-2">
                    Favorites Count
                  </label>
                  <input
                    type="number"
                    value={formData.favoritesCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        favoritesCount: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-transparent border-2 rounded-xl p-3 text-white outline-none focus:border-opacity-100 transition-all"
                    style={{ borderColor: themeColor }}
                  />
                </div>

                <div
                  className="flex items-center justify-between p-4 border-2 rounded-xl"
                  style={{ borderColor: themeColor }}
                >
                  <div>
                    <label className="text-white text-sm block mb-1">
                      Availability
                    </label>
                    <p className="text-gray-400 text-xs">
                      Unavailable models won't show on client
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.available}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          available: e.target.checked,
                        })
                      }
                    />
                    <div
                      className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all"
                      style={{
                        backgroundColor: formData.available
                          ? themeColor
                          : "#374151",
                      }}
                    ></div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 rounded-full text-black font-bold transition-all hover:scale-105"
                    style={{ backgroundColor: themeColor }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-full border text-white font-bold transition-all hover:bg-gray-800"
                    style={{ borderColor: themeColor }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModels;
