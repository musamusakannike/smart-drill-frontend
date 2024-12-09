"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-blue-900 dark:text-blue-300">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          It might have been moved or deleted.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="py-2 px-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100 dark:focus:ring-offset-gray-800"
          >
            Go Home
          </button>
          <button
            onClick={() => router.back()}
            className="py-2 px-6 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
