"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { BookOpen, Edit3, HelpCircle } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiRequest("user/me", "GET");
        console.log(userData)
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Greeting */}
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
            {loading ? "Loading..." : `Hello, ${user?.data.user.fullname || "Student"}!`}
          </h1>

          {/* Search Bar */}
          <div className="relative w-1/2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for past questions, mock tests, etc..."
              className="w-full p-2 pl-10 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 10l6 6m-6-6h.01M10 10a6 6 0 1111.548-1.636A9.993 9.993 0 0110 10z"
                />
              </svg>
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Past Questions */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
            <BookOpen className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Past Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access a large collection of past questions to prepare effectively
              for your exams.
            </p>
          </div>

          {/* Mock Tests */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
            <Edit3 className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Mock Tests
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Take mock tests to practice and track your progress for exams.
            </p>
          </div>

          {/* Brainstorm with AI */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
            <HelpCircle className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Brainstorm with AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Use AI to brainstorm and understand complex topics with ease.
            </p>
          </div>
        </div>

        {/* More Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white">
              Personalized Recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Get study materials tailored to your specific needs.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white">
              Real-Time Progress Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              See how you're progressing over time with detailed analytics.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white">
              Community Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Engage with fellow students and share knowledge.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
