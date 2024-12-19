"use client";

import Link from "next/link";
import { useState } from "react";

const courses = {
  "1st Semester Courses": [
    "PHY101",
    "PHY103",
    "PHY107",
    "CHM107",
    "CHM101",
    "MTH101",
    "MTH103",
    "GET101",
    "GST111",
    "MEE101",
    "STA121",
    "COS101",
  ],
  "2nd Semester Courses": [
    "CHM102",
    "CHM108",
    "MTH102",
    "MAT114",
    "PHY142",
    "PHY102",
    "PHY104",
    "PHY108",
    "GST112",
    "STA112",
  ],
};

const PastQuestions100 = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on the search term
  const filterCourses = (semesterCourses) =>
    semesterCourses.filter((course) =>
      course.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-8">
          100 Level Courses
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for courses..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Course Lists */}
        {Object.entries(courses).map(([semester, semesterCourses]) => {
          const filteredCourses = filterCourses(semesterCourses);

          return (
            <div key={semester} className="mb-8">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">
                {semester}
              </h3>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCourses.map((course) => (
                    <Link
                      href={`/past-questions/${course}`}
                      key={course}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
                    >
                      <h4 className="text-lg font-bold text-blue-900 dark:text-white">
                        {course}
                      </h4>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  No courses match your search.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastQuestions100;
