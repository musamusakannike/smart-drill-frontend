"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api";
import QuestionCard from "@/components/ui/QuestionCard";

const SearchPage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses] = useState([
    "PHY101",
    "CHM101",
    "GST111",
    "GET101",
    "PHY103",
    "MTH101",
    "CHM102",
  ]); // Sample courses
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const tags = selectedTags.join(",");
      const response = await apiRequest(
        `questions?search=${searchTerm}&tags=${tags}&course=${selectedCourse}&page=${currentPage}&limit=15`,
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

  useEffect(() => {
    fetchQuestions();
  }, [searchTerm, selectedTags, selectedCourse, currentPage]);

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setSelectedTags((prev) => [...prev, e.target.value.trim()]);
      e.target.value = ""; // Clear input
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-8">
          Search Questions
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Courses List */}
        <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 dark:scrollbar-thumb-gray-600">
          {courses.map((course) => (
            <button
              key={course}
              onClick={() => handleCourseSelect(course)}
              className={`px-4 py-2 rounded-md ${
                selectedCourse === course
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              }`}
            >
              {course}
            </button>
          ))}
        </div>

        {/* Tags Input */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter tags and press Enter..."
              onKeyDown={handleTagInput}
              className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} &times;
              </span>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading questions...
          </p>
        ) : questions.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((question) => (
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
            No questions found. Try different search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
