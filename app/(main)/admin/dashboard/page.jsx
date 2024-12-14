"use client";

import { apiRequest } from "@/utils/api";
import { User, FileText, PlusCircle, Edit3, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch admin details (if needed)
    const fetchAdminDetails = async () => {
      try {
        const response = await apiRequest("user/me", "GET");
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Greeting */}
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
            Hello, {user?.fullname || "Admin"}!
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white text-center mb-8">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* View All Users */}
          <div
            onClick={() => (window.location.href = "/admin/users")}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer text-center"
          >
            <User className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Manage Users
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage the list of all users.
            </p>
          </div>

          {/* Add New Question */}
          <div
            onClick={() => (window.location.href = "/admin/questions/new")}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer text-center"
          >
            <PlusCircle className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Add New Question
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add a new question to the database.
            </p>
          </div>

          {/* View All Questions */}
          <div
            onClick={() => (window.location.href = "/admin/questions")}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer text-center"
          >
            <FileText className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Manage Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage the list of all questions.
            </p>
          </div>

          {/* Update a Question */}
          <div
            onClick={() => (window.location.href = "/admin/questions/update")}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer text-center"
          >
            <Edit3 className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Update Question
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Edit the details of an existing question.
            </p>
          </div>

          {/* Delete a Question */}
          <div
            onClick={() => (window.location.href = "/admin/questions/delete")}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer text-center"
          >
            <Trash2 className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Delete Question
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Remove a question from the database.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;