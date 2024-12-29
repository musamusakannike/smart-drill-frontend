"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import {
  Edit3,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  PlusCircle,
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { RotateLoader } from "react-spinners";
import Link from "next/link";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const { showToast } = useToast();

  // Fetch paginated questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `questions?page=${page}&limit=15&search=${search}`,
        "GET"
      );
      const { questions, totalPages: total } = response.data;
      setQuestions(questions);
      setTotalPages(total);
      showToast("Questions fetched successfully", "success");
    } catch (error) {
      console.error("Failed to fetch questions:", error.message);
      showToast("Failed to fetch questions", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Update question
  const handleUpdateQuestion = async (questionId, updatedDetails) => {
    try {
      setUpdateLoading(true);
      await apiRequest(`questions/${questionId}`, "PUT", updatedDetails);
      showToast("Question updated successfully!", "success");
      setEditMode(null); // Exit edit mode
      fetchQuestions(); // Refresh the question list
    } catch (error) {
      console.error("Failed to update question:", error.message);
      showToast("Failed to update question.", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Delete question
  const handleDeleteQuestion = async (questionId) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      setDeleteLoading(true);
      await apiRequest(`questions/${questionId}`, "DELETE");
      showToast("Question deleted successfully!", "success");
      fetchQuestions(); // Refresh the question list after deletion
    } catch (error) {
      console.error("Failed to delete question:", error.message);
      showToast("Failed to delete question.", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for questions..."
              className="w-full p-3 pl-10 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </span>
          </div>
        </div>
      </div>

      {/* Question List */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex w-full justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-blue-900 dark:text-white">
            Question Management
          </h2>
          <Link
            href={"/admin/questions/new"}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 font-semibold text-lg"
          >
            <PlusCircle /> Add Question
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question) => (
              <div
                key={question._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {editMode === question._id ? (
                  // Edit Mode
                  <div>
                    <input
                      type="text"
                      defaultValue={question.question}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) => (question.question = e.target.value)}
                    />
                    {question.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        defaultValue={option}
                        className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                        onChange={(e) =>
                          (question.options[index] = e.target.value)
                        }
                      />
                    ))}
                    <input
                      type="number"
                      min="1"
                      max="4"
                      defaultValue={question.correctOption}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) =>
                        (question.correctOption = parseInt(e.target.value))
                      }
                    />
                    <input
                      type="text"
                      defaultValue={question.explanation}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) => (question.explanation = e.target.value)}
                    />
                    <input
                      type="text"
                      defaultValue={question.tags.join(", ")}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) =>
                        (question.tags = e.target.value.split(", "))
                      }
                    />
                    <input
                      type="text"
                      defaultValue={question.course}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) => (question.course = e.target.value)}
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          handleUpdateQuestion(question._id, question)
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        {updateLoading ? (
                          "Saving..."
                        ) : (
                          <>
                            <CheckCircle className="inline w-5 h-5" /> Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        <XCircle className="inline w-5 h-5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 dark:text-white mb-2">
                      {question.question}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-2">
                      {question.options.map((option, index) => (
                        <li key={index}>
                          {index + 1}. {option}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Correct Option:</strong> {question.correctOption}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Tags:</strong> {question.tags.join(", ")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Course:</strong> {question.course}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setEditMode(question._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <Edit3 className="inline w-5 h-5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        {deleteLoading ? (
                          <div className="w-screen h-screen flex flex-col justify-center items-center bg-black opacity-90 fixed top-0 left-0">
                            <RotateLoader color="#2563eb" />
                            <p className="text-center text-gray-700 dark:text-gray-300 mt-7">
                              Deleting...
                            </p>
                          </div>
                        ) : (
                          <>
                            <Trash2 className="inline w-5 h-5" /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded ${
              page === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
          >
            Previous
          </button>
          <span className="text-blue-900 dark:text-white font-bold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuestionsPage;
