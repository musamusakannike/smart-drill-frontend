"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const MockTestHistory = () => {
  const [mockTests, setMockTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch mock test history
  useEffect(() => {
    const fetchMockTestHistory = async () => {
      setLoading(true);
      try {
        const response = await apiRequest("mock-test/history", "GET");
        setMockTests(response.data);
      } catch (error) {
        console.error("Failed to fetch mock test history:", error.message);
        setError(error.response?.data?.message || "Failed to load mock test history.");
      } finally {
        setLoading(false);
      }
    };

    fetchMockTestHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-blue-900 dark:text-blue-300">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-xl text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">
          Mock Test History
        </h1>
        <div className="space-y-6">
          {mockTests.map((test) => (
            <div
              key={test.sessionId}
              className="p-4 bg-white dark:bg-gray-800 rounded-md shadow"
            >
              <h2 className="text-lg font-bold text-blue-900 dark:text-white">
                {test.course}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Score: {test.score}/{test.totalQuestions} (
                {test.percentage}%)
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Start: {new Date(test.startTime).toLocaleString()}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                End: {new Date(test.endTime).toLocaleString()}
              </p>
              <button
                onClick={() => router.push(`/mock-history/${test.sessionId}`)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTestHistory;
