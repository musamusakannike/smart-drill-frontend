"use client";

import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { useToast } from "@/contexts/ToastContext";
import { Loader } from "lucide-react";

const NewQuestionPage = () => {
  const { showToast } = useToast();
  const [singleQuestion, setSingleQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: 1,
    explanation: "",
    tags: "",
    course: "",
  });
  const [batchQuestions, setBatchQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes for single question
  const handleSingleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Handle option changes for single question
  const handleOptionChange = (index, value) => {
    setSingleQuestion((prev) => {
      const options = [...prev.options];
      options[index] = value;
      return { ...prev, options };
    });
  };

  // Handle submission of a single question
  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedTags = singleQuestion.tags.split(",").map((tag) => tag.trim());
      const response = await apiRequest("questions", "POST", {
        ...singleQuestion,
        tags: formattedTags,
      });
      showToast("Single question added successfully!", "success");
      setSingleQuestion({
        question: "",
        options: ["", "", "", ""],
        correctOption: 1,
        explanation: "",
        tags: "",
        course: "",
      });
    } catch (error) {
      console.error("Failed to add question:", error.message);
      showToast("Failed to add single question", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of batch questions
  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsedQuestions = JSON.parse(batchQuestions);
      const response = await apiRequest("questions/batch", "POST", { questions: parsedQuestions });
      showToast("Batch questions added successfully!", "success");
      setBatchQuestions("");
    } catch (error) {
      console.error("Failed to add batch questions:", error.message);
      showToast("Failed to add batch questions.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-8">
          Add New Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form for Single Question */}
          <form
            onSubmit={handleSingleSubmit}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-6">
              Add Single Question
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Question
                </label>
                <textarea
                  name="question"
                  value={singleQuestion.question}
                  onChange={handleSingleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Enter the question"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Options
                </label>
                {singleQuestion.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full mt-1 mb-2 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                ))}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Correct Option (1-4)
                </label>
                <input
                  type="number"
                  name="correctOption"
                  value={singleQuestion.correctOption}
                  onChange={handleSingleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  min="1"
                  max="4"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Explanation
                </label>
                <textarea
                  name="explanation"
                  value={singleQuestion.explanation}
                  onChange={handleSingleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Enter explanation"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={singleQuestion.tags}
                  onChange={handleSingleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., Physics, Light"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  value={singleQuestion.course}
                  onChange={handleSingleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., Physics"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? <Loader className="inline w-5 h-5 animate-spin" /> : "Add Question"}
              </button>
            </div>
          </form>

          {/* Form for Batch Questions */}
          <form
            onSubmit={handleBatchSubmit}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-6">
              Add Batch Questions
            </h3>
            <textarea
              value={batchQuestions}
              onChange={(e) => setBatchQuestions(e.target.value)}
              className="w-full h-[500px] mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
              placeholder="Paste JSON of questions here"
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Loader className="inline w-5 h-5 animate-spin" /> : "Add Questions"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionPage;
