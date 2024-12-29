"use client";
import React, { useEffect } from "react";
import "animate.css";

const Toast = ({ message, type, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className="absolute bottom-5 w-screen flex justify-center items-center">
    <div
      className={`mx-auto text-center px-4 py-2 rounded shadow-md text-sm animate__animated animate__slideInUp animate__fast 
      ${typeStyles[type]} 
      w-11/12 max-w-sm sm:w-full sm:max-w-md md:text-base`}
    >
      {message}
    </div>
    </div>
  );
};

export default Toast;
