"use client";

import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { apiRequest } from "@/utils/api";

const QuestionList = ({ course }) => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch questions on component mount or when page changes
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await apiRequest(
          `questions?course=${course}&page=${currentPage}`,
          "GET"
        );
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch questions:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [course, currentPage]);

  // Filter questions based on search input
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(search.toLowerCase())
  );

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question._id} questionData={question} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              >
                Previous
              </button>
              <span className="text-blue-900 dark:text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              >
                Next
              </button>
            </div>
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
