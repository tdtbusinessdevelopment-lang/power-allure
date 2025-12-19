import React, { useState } from "react";
import axios from "axios";

const AdminUpload = () => {
  const themeColor = "#d6b48e";
  const [mainImage, setMainImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    height: "",
    weight: "",
  });
  const [loading, setLoading] = useState(false);

  // Cloudinary Config - Replace these!
  const CLOUD_NAME = "YOUR_CLOUD_NAME";
  const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `api.cloudinary.com{CLOUD_NAME}/image/upload`,
      data
    );
    return res.data.secure_url;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!mainImage) return alert("Please select a main image");
    setLoading(true);

    try {
      // 1. Upload Main Image
      const mainImageUrl = await uploadToCloudinary(mainImage);

      // 2. Upload Gallery Images (Multiple)
      const galleryUrls = [];
      if (galleryFiles.length > 0) {
        // Upload all gallery images simultaneously
        const uploadPromises = Array.from(galleryFiles).map((file) =>
          uploadToCloudinary(file)
        );
        const results = await Promise.all(uploadPromises);
        galleryUrls.push(...results);
      }

      // 3. Save to MongoDB (Matches your Mongoose Schema)
      const finalData = {
        ...formData,
        imageUrl: mainImageUrl, // Required string
        galleryImages: galleryUrls, // Array of strings
      };

      await axios.post("http://localhost:5000/api/models", finalData);

      alert("Model and Gallery saved successfully!");
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
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
            required
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
    </div>
  );
};

export default AdminUpload;
