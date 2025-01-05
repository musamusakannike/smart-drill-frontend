"use client";

import Link from "next/link";
import { Lock, BookOpen } from "lucide-react";

const PastQuestionsPage = () => {
  const levels = [
    { name: "100 Level", available: true, href: "/past-questions/100" },
    { name: "200 Level", available: false },
    { name: "300 Level", available: false },
    { name: "400 Level", available: false },
    { name: "500 Level", available: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-8">
          Past Questions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            (<Link
              href={`${level.available ? level.href : ""}`}
              key={index}
              className={`p-6 rounded-lg shadow-md transition-shadow text-center ${
                level.available
                  ? "bg-white dark:bg-gray-800 hover:shadow-xl cursor-pointer"
                  : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
              }`}
            >
              <div className="flex justify-center items-center mb-4">
                {level.available ? (
                    <BookOpen className="w-12 h-12 text-blue-500" />
                ) : (
                  <Lock className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              {level.available ? (
                <h6
                  className="text-xl font-bold text-blue-900 dark:text-white hover:underline"
                >
                  {level.name}
                </h6>
              ) : (
                <p className="text-xl font-bold text-gray-500 dark:text-gray-400">
                  {level.name}
                </p>
              )}
              {!level.available && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Locked
                </p>
              )}
            </Link>)
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastQuestionsPage;
