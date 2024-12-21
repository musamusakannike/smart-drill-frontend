"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";

const MockTestClient = ({ course }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countdown, setCountdown] = useState(1200); // 20 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const router = useRouter();

  // Fetch questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiRequest(`mock-test?course=${course}`, "GET");
        setQuestions(response.data.questions);
        setSessionId(response.data.sessionId);
        setAnswers(new Array(response.data.questions.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error.message);
      }
    };

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
      const response = await apiRequest("mock-test/submit", "POST", {
        sessionId,
        answers,
      });
      alert(`Test submitted! You scored ${response.data.score}`);
      router.push("/dashboard"); // Redirect after submission
    } catch (error) {
      console.error("Failed to submit test:", error.message);
    }
  };

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
        <p className="text-gray-700 dark:text-gray-400 mb-6">
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
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default MockTestClient;
