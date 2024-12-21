"use client";

import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        {/* Spinner */}
        <MoonLoader
          size={60}
          color="#3b82f6" // Tailwind blue-500
          className="mb-6"
        />
        {/* Loading Text */}
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
          Loading, please wait...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Your content is being prepared.
        </p>
      </div>
    </div>
  );
};

export default Loading;
