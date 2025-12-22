import React from "react";
import { FavoriteButton } from "./FavoriteButton";

export const ModelDetails = ({ modelData, isFavorite, toggleFavorite }) => {
  return (
    <div className="lg:col-span-2 flex flex-col pt-8 animate-slide-up">
      <div className="mb-6">
        <span className="bg-gold/10 text-gold text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-gold/30">
          {modelData.category || "Foreign"}
        </span>
      </div>

      <h1 className="font-serif text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
        {modelData.name?.toUpperCase() || "UNKNOWN"}
      </h1>

      <div className="bg-charcoal border border-gold/10 rounded-2xl p-6 mb-8 shadow-elegant">
        <h3 className="font-serif text-2xl text-gold mb-4">Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm">Age</p>
            <p className="text-white text-xl font-semibold">
              {modelData.age || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Weight</p>
            <p className="text-white text-xl font-semibold">
              {modelData.weight || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Height</p>
            <p className="text-white text-xl font-semibold">
              {modelData.height || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-charcoal border border-gold/10 rounded-2xl p-6 mb-8 shadow-elegant">
        <h3 className="font-serif text-2xl text-gold mb-4">
          About {modelData.name}
        </h3>
        <p className="text-gray-300 leading-relaxed font-light">
          {modelData.description || "No description available."}
        </p>
      </div>

      <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
    </div>
  );
};
