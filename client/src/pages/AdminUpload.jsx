import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

const AdminUpload = () => {
  const themeColor = "#d6b48e";
  const [mainImage, setMainImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [collection, setCollection] = useState("local"); // 'local' or 'foreign'
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    height: "",
    weight: "",
  });
  const [loading, setLoading] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!mainImage) return alert("Please select a main image");
    setLoading(true);

    try {
      // 1. Convert Main Image to base64
      const mainImageBase64 = await fileToBase64(mainImage);

      // 2. Convert Gallery Images to base64
      const galleryBase64 = [];
      if (galleryFiles.length > 0) {
        const convertPromises = Array.from(galleryFiles).map((file) =>
          fileToBase64(file)
        );
        const results = await Promise.all(convertPromises);
        galleryBase64.push(...results);
      }

      // 3. Save to MongoDB with appropriate endpoint
      const finalData = {
        ...formData,
        imageUrl: mainImageBase64,
        galleryImages: galleryBase64,
      };

      const endpoint =
        collection === "local"
          ? `${API_URL}/models/local`
          : `${API_URL}/models/foreign`;

      await axios.post(endpoint, finalData);

      alert(
        `${
          collection === "local" ? "Local" : "Foreign"
        } talent saved successfully!`
      );
      setFormData({
        name: "",
        age: "",
        description: "",
        height: "",
        weight: "",
      });
      setMainImage(null);
      setGalleryFiles([]);
    } catch (error) {
      console.error(error);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async () => {
    setLoadingModels(true);
    try {
      const endpoint =
        collection === "local"
          ? `${API_URL}/models/local`
          : `${API_URL}/models/foreign`;
      const response = await axios.get(endpoint);
      setModels(response.data);
    } catch (error) {
      console.error("Failed to fetch models:", error);
      alert("Failed to load models");
    } finally {
      setLoadingModels(false);
    }
  };

  const handleDelete = async (modelId, modelName) => {
    if (!confirm(`Are you sure you want to delete "${modelName}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/models/${modelId}`);
      alert("Model deleted successfully!");
      // Refresh the list
      fetchModels();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete model");
    }
  };

  const openManageModal = () => {
    setShowManageModal(true);
    fetchModels();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-lg border p-8 rounded-3xl"
        style={{ borderColor: themeColor }}
      >
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: themeColor }}
        >
          Add Talent & Gallery
        </h2>

        {/* Manage Models Button */}
        <button
          type="button"
          onClick={openManageModal}
          className="w-full mb-6 py-2 rounded-full border text-white font-semibold transition-all hover:text-black"
          style={{ borderColor: themeColor }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = themeColor;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          📋 Manage Models
        </button>

        {/* Collection Selection */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setCollection("local")}
            className={`flex-1 py-2 rounded-full font-semibold transition-all ${
              collection === "local" ? "text-black" : "text-white border"
            }`}
            style={{
              backgroundColor:
                collection === "local" ? themeColor : "transparent",
              borderColor: collection === "local" ? themeColor : themeColor,
            }}
          >
            Local
          </button>
          <button
            type="button"
            onClick={() => setCollection("foreign")}
            className={`flex-1 py-2 rounded-full font-semibold transition-all ${
              collection === "foreign" ? "text-black" : "text-white border"
            }`}
            style={{
              backgroundColor:
                collection === "foreign" ? themeColor : "transparent",
              borderColor: collection === "foreign" ? themeColor : themeColor,
            }}
          >
            Foreign
          </button>
        </div>

        <div className="mb-4">
          <label className="text-white text-sm block mb-1">
            Main Profile Image (Required)
          </label>
          <input
            type="file"
            onChange={(e) => setMainImage(e.target.files[0])}
            className="text-white w-full"
            accept="image/*"
          />
        </div>

        <div className="mb-6">
          <label className="text-white text-sm block mb-1">
            Gallery Images (Optional)
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setGalleryFiles(e.target.files)}
            className="text-white w-full"
            accept="image/*"
          />
        </div>

        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full bg-transparent border-b mb-4 p-2 text-white outline-none"
          style={{ borderColor: themeColor }}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Age"
            className="w-1/3 bg-transparent border-b mb-4 p-2 text-white outline-none"
            style={{ borderColor: themeColor }}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            value={formData.age}
          />
          <input
            type="text"
            placeholder="Weight"
            className="w-1/3 bg-transparent border-b mb-4 p-2 text-white outline-none"
            style={{ borderColor: themeColor }}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            value={formData.weight}
          />
          <input
            type="text"
            placeholder="Height"
            className="w-1/3 bg-transparent border-b mb-4 p-2 text-white outline-none"
            style={{ borderColor: themeColor }}
            onChange={(e) =>
              setFormData({ ...formData, height: e.target.value })
            }
            value={formData.height}
          />
        </div>

        <textarea
          placeholder="Bio"
          className="w-full bg-transparent border-b mb-6 p-2 text-white outline-none"
          style={{ borderColor: themeColor }}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full text-black font-bold transition-all hover:scale-105"
          style={{ backgroundColor: themeColor }}
        >
          {loading
            ? `Uploading ${galleryFiles.length + 1} images...`
            : "Save to Power Allure"}
        </button>
      </form>

      {/* Manage Models Modal */}
      {showManageModal && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black bg-opacity-95 flex items-center justify-center z-50 p-6"
          onClick={() => setShowManageModal(false)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ borderColor: themeColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{ color: themeColor }}>
                Manage {collection === "local" ? "Local" : "Foreign"} Models
              </h3>
              <button
                onClick={() => setShowManageModal(false)}
                className="text-white hover:text-red-500 text-3xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            {loadingModels ? (
              <p className="text-white text-center py-8">Loading models...</p>
            ) : models.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No models found in this collection
              </p>
            ) : (
              <div className="space-y-3">
                {models.map((model) => (
                  <div
                    key={model._id}
                    className="flex items-center justify-between p-4 rounded-xl border transition-all hover:bg-opacity-10 hover:bg-white"
                    style={{ borderColor: themeColor }}
                  >
                    <div>
                      <p className="text-white font-semibold text-lg">
                        {model.name}
                      </p>
                      <p className="text-gray-400 text-sm">ID: {model._id}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(model._id, model.name)}
                      className="px-4 py-2 rounded-full border text-white font-semibold transition-all hover:bg-red-600 hover:border-red-600"
                      style={{ borderColor: themeColor }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
