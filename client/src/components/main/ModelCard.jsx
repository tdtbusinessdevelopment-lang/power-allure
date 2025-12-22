import React from "react";

export const ModelCard = ({ model, handleCardClick, isFeatured }) => {
  const themeColor = "#D8AF7F";

  if (isFeatured) {
    return (
      <div
        onClick={() => handleCardClick(model)}
        className="relative rounded-3xl overflow-hidden cursor-pointer group animate-card-entrance"
        style={{
          background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}40)`,
          padding: "3px",
        }}
      >
        <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-[1.4rem] overflow-hidden">
          {model.imageUrl ? (
            <>
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div
                className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-md"
                style={{
                  backgroundColor: `${themeColor}30`,
                  border: `1px solid ${themeColor}`,
                }}
              >
                <span
                  className="text-sm font-bold tracking-wider uppercase"
                  style={{ color: themeColor }}
                >
                  Featured
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-2 tracking-wide"
                  style={{ color: themeColor }}
                >
                  {model.name}
                </h2>
                {model.age && (
                  <p className="text-white/80 text-lg">Age: {model.age}</p>
                )}
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.4rem]"
                style={{ boxShadow: `inset 0 0 60px ${themeColor}40` }}
              ></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </div>
    );
  }

  const isLarge = model.isLarge;
  const isMedium = model.isMedium;

  return (
    <div
      onClick={() => handleCardClick(model)}
      className={`relative rounded-3xl overflow-hidden cursor-pointer group animate-card-entrance ${
        isLarge ? "lg:col-span-2 lg:row-span-2" : isMedium ? "md:col-span-1" : ""
      }`}
      style={{
        background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}30)`,
        padding: "2px",
      }}
    >
      <div
        className={`relative ${
          isLarge ? "h-[600px]" : isMedium ? "h-[450px]" : "h-[400px]"
        } bg-gradient-to-br from-gray-900 to-black rounded-[1.4rem] overflow-hidden`}
      >
        {model.imageUrl ? (
          <>
            <img
              src={model.imageUrl}
              alt={model.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3
                className={`${
                  isLarge ? "text-2xl" : "text-xl"
                } font-bold tracking-wide mb-1`}
                style={{ color: themeColor }}
              >
                {model.name}
              </h3>
              {model.age && (
                <p className="text-white/70 text-sm">Age: {model.age}</p>
              )}
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${themeColor}60` }}
      ></div>
    </div>
  );
};
