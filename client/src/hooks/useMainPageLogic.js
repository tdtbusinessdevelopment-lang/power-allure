import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export const useMainPageLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "LOCAL"
  );
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchModels = async (category) => {
    setLoading(true);
    try {
      const endpoint = category === "LOCAL" ? "local" : "foreign";
      const response = await fetch(
        `${API_URL}/models/${endpoint}?available=true`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setModels([]);
        setLoading(false);
        return;
      }
      const response = await fetch(
        `${API_URL}/api/users/${user._id}/favorites`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const favorites = await response.json();
      const validFavorites = favorites.filter((fav) => {
        const hasValidId = fav._id && fav._id !== "undefined";
        if (!hasValidId) {
          console.warn("Favorite missing valid _id:", fav);
        }
        return hasValidId;
      });
      setModels(validFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "LOCAL" || activeTab === "FOREIGN") {
      fetchModels(activeTab);
    } else if (activeTab === "FAVORITES") {
      fetchFavorites();
    }
  }, [activeTab]);

  const handleCardClick = (model) => {
    navigate(`/model/${model._id}`, {
      state: { selectedImage: model.imageUrl, category: activeTab },
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const featuredModels = models.slice(0, 2);
  const regularModels = models.slice(2);

  return {
    activeTab,
    models,
    loading,
    featuredModels,
    regularModels,
    handleCardClick,
    handleTabClick,
    navigate,
  };
};
