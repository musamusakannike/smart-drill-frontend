"use client";

import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { apiRequest } from "@/utils/api";

const QuestionList = ({ course }) => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiRequest(`questions?course=${course}`, "GET");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [course]);

  // Filter questions based on search input
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-8">
          Questions for {course}
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading questions...
          </p>
        ) : filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question._id} questionData={question} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No questions found for your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
