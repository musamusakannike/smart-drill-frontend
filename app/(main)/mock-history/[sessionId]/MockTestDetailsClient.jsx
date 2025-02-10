"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";

const MockTestDetailsClient = ({ sessionId }) => {
  const [mockTest, setMockTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch mock test details
  const fetchMockTestDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(`mock-test/history/${sessionId}`, "GET");
      setMockTest(response.data); // Save the mock test details
    } catch (error) {
      console.error("Failed to fetch mock test details:", error.message);
      setError("Failed to load mock test details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMockTestDetails();
  }, [sessionId]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-blue-900 dark:text-blue-300">
          Loading test details...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-center text-xl text-red-600 dark:text-red-400 mb-4">
          {error}
        </p>
        <button
          onClick={fetchMockTestDetails}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render Mock Test Details
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-4">
          Mock Test Details: {mockTest.course}
        </h1>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          <strong>Score:</strong> {mockTest.score}/{mockTest.totalQuestions} (
          {mockTest.percentage}%)
        </p>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          <strong>Start Time:</strong>{" "}
          {new Date(mockTest.startTime).toLocaleString()}
        </p>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          <strong>End Time:</strong> {new Date(mockTest.endTime).toLocaleString()}
        </p>

        {/* Corrections */}
        <div className="space-y-6">
          {mockTest.corrections.map((correction, index) => (
            <div
              key={index}
              className={`p-4 rounded-md shadow bg-white dark:bg-gray-800`}
            >
              <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-2">
                Question {index + 1}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {correction.question}
              </p>
              <div className="mt-4">
                {correction.options.map((option, i) => (
                  <p
                    key={i}
                    className={`p-2 rounded-md ${
                      i + 1 === correction.correctOption
                        ? "bg-blue-500 text-white"
                        : i + 1 === correction.userAnswer
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {i + 1}. {option}
                  </p>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                <strong>Explanation:</strong> {correction.explanation}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/mock-test/history")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to History
        </button>
      </div>
    </div>
  );
};

export default MockTestDetailsClient;
