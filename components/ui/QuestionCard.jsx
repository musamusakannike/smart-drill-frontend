"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const QuestionCard = ({ questionData }) => {
  const { question, options, correctOption, explanation } = questionData;
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const isCorrect = selectedOption === correctOption;

  const handleCheckAnswer = () => {
    if (selectedOption !== null) {
      setShowAnswer(true);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index + 1);
    setShowAnswer(false); // Reset animation if user changes answer
  };

  return (
    <motion.div
      className="relative w-full h-full perspective"
    >
      {/* Front Side */}
      <motion.div
        className={` inset-0 w-full h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center backface-hidden`}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: showAnswer ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-bold text-blue-900 dark:text-white mb-4">
          {question}
        </h3>
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${
                selectedOption === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <span className="mr-3">{index + 1}.</span> {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleCheckAnswer}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedOption === null}
        >
          Check Answer
        </button>
      </motion.div>

      {/* Back Side */}
      <motion.div
        className={`absolute inset-0 w-full h-full p-6 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col justify-center items-center backface-hidden`}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: showAnswer ? 360 : 180 }}
        transition={{ duration: 0.6 }}
      >
        <h3
          className={`text-lg font-bold mb-4 ${
            isCorrect
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isCorrect ? "Correct!" : "Wrong!"}
        </h3>
        <p className="text-gray-800 dark:text-gray-200 mb-4">
          {isCorrect
            ? "Great job! You selected the right answer."
            : "Unfortunately, that was incorrect."}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <strong>Explanation:</strong> {explanation}
        </p>
        <button
          onClick={() => setShowAnswer(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Another Question
        </button>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;
