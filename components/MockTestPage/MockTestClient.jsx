"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";
import "animate.css"; // Import animate.css
import confetti from "canvas-confetti";

const MockTestClient = ({ course }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countdown, setCountdown] = useState(1200); // 20 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const [sessionId, setSessionId] = useState(null);
  const [showResult, setShowResult] = useState(false); // Result modal visibility
  const [result, setResult] = useState(null); // Test result
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  // Fetch questions when the component mounts
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(`mock-test?course=${course}`, "GET");
      setQuestions(response.data.questions);
      setSessionId(response.data.sessionId);
      setAnswers(new Array(response.data.questions.length).fill(null));
    } catch (error) {
      console.error("Failed to fetch questions:", error.message);
      setError(
        error.response?.data?.message || "No questions found for this course."
      );
    } finally {
      setLoading(false);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    fetchQuestions();
  }, [course]);

  // Countdown timer logic
  useEffect(() => {
    if (countdown <= 0) {
      handleSubmit(); // Auto-submit when time runs out
    }
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleAnswerChange = (index, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = option;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const response = await apiRequest("mock-test/submit", "POST", {
        sessionId,
        answers,
      });
      setResult(response.data); // Save the result
      setShowResult(true); // Show the result modal
      triggerConfetti(); // Trigger confetti animation when the test is submitted
    } catch (error) {
      console.error("Failed to submit test:", error.message);
      alert("Failed to submit test. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Error Handling UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-center text-xl text-red-600 dark:text-red-400 mb-4">
          {error}
        </p>
        <button
          onClick={fetchQuestions}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Loading State UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-blue-900 dark:text-blue-300">
          Loading test...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-4">
          Mock Test: {course}
        </h1>
        <p className="text-gray-700 dark:text-gray-400 mb-6 sticky top-0 bg-white dark:bg-gray-800 p-4 rounded-md shadow">
          Time Left: {Math.floor(countdown / 60)}:
          {String(countdown % 60).padStart(2, "0")}
        </p>
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={q._id}
              className="p-4 bg-white dark:bg-gray-800 rounded-md shadow"
            >
              <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-2">
                Question {index + 1}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{q.question}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerChange(index, i + 1)}
                    className={`px-4 py-2 rounded-md ${
                      answers[index] === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {submitLoading ? "Loading..." : "Submit Test"}
        </button>
      </div>

      {/* Result Modal */}
      {showResult && result && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full animate__animated animate__fadeIn">
              <h2 className="text-xl font-bold text-blue-900 dark:text-white">
                {result.percentage >= 80
                  ? "Congratulations!"
                  : result.percentage >= 50
                  ? "Well Done!"
                  : "Better Luck Next Time!"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                You scored {result.score}/{result.total} ({result.percentage}%)
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MockTestClient;
