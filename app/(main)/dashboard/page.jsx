"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { BookOpen, Edit3, HelpCircle } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiRequest("user/me", "GET");
        console.log(userData);
        setUser(userData);
        if (userData?.data?.user?.role === "admin") {
          setShowAdminModal(true);
        }
      } catch (error) {
        showToast("Failed to fetch user details, switching to login", "error");
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleNavigateToAdmin = () => {
    window.location.href = "/admin/dashboard"; // Navigate to admin dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Greeting */}
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
            {loading
              ? "Loading..."
              : `Hello, ${user?.data?.user?.fullname || "Student"}!`}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Past Questions */}
          <Link
            href={"/past-questions"}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <BookOpen className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Past Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access a large collection of past questions to prepare effectively
              for your exams.
            </p>
          </Link>

          {/* Mock Tests */}
          <Link
            href={"/mock-test"}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <Edit3 className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Mock Tests
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Take mock tests to practice and track your progress for exams.
            </p>
          </Link>

          {/* Brainstorm with AI */}
          <Link
            href={"/chat"}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <HelpCircle className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Brainstorm with AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Use AI to brainstorm and understand complex topics with ease.
            </p>
          </Link>
        </div>

        {/* More Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white">
              Study Materials
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Get study materials tailored to your specific needs.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white">
              Real-Time Progress Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              See how you&apos;re progressing over time with detailed analytics.
            </p>
          </div>

          <Link href={"/community"} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white">
              Community Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Engage with fellow students and share knowledge.
            </p>
          </Link>
        </div>
      </main>

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              You have admin privileges. Would you like to go to the admin
              dashboard?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowAdminModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleNavigateToAdmin}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
