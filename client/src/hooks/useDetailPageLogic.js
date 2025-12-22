import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API_URL from "../config/api";

export const useDetailPageLogic = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("LOCAL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.category) {
      setActiveTab(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchModelData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/models/${id}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setModelData(data);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.favorites) {
          setIsFavorite(user.favorites.some((fav) => fav.modelId === data._id));
        }
      } catch (error) {
        console.error("Error fetching model data:", error);
        setModelData(null);
        navigate("/error", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== "undefined") {
      fetchModelData();
    } else {
      setLoading(false);
      navigate("/error", { replace: true });
    }
  }, [id, navigate]);

  const galleryImages =
    modelData?.galleryImages?.length > 0
      ? modelData.galleryImages
      : modelData?.imageUrl
      ? [modelData.imageUrl]
      : [];

  const primaryImageUrl =
    modelData?.imageUrl || (galleryImages.length > 0 ? galleryImages[0] : "");

  const toggleFavorite = async () => {
    if (!modelData) return;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const endpoint = isFavorite ? "remove" : "add";
    try {
      const response = await fetch(
        `${API_URL}/api/users/favorites/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            modelId: modelData._id,
            name: modelData.name,
            imageUrl: primaryImageUrl,
            category: modelData.category || "Foreign",
          }),
        }
      );

      if (response.ok) {
        setIsFavorite(!isFavorite);
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Failed to update favorites", error);
    }
  };

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return {
    activeTab,
    currentIndex,
    modelData,
    loading,
    isFavorite,
    mounted,
    galleryImages,
    setActiveTab,
    setCurrentIndex,
    toggleFavorite,
    navigate,
  };
};
