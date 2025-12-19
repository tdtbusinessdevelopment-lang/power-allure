import React from "react";

const LoadingSpinner = ({ message = "Loading...", size = "default" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-16 h-16",
    large: "w-24 h-24",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-[#dcb887]/20`}
        ></div>

        {/* Spinning ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-[#dcb887] absolute top-0 left-0 animate-spin`}
          style={{ animationDuration: "1s" }}
        ></div>

        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#dcb887] rounded-full animate-pulse"></div>
      </div>

      {/* Loading text */}
      {message && (
        <p className="text-[#dcb887] text-lg font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
