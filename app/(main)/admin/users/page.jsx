"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { Edit3, Trash2, Search } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const { showToast } = useToast();

  // Fetch paginated users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `user?page=${page}&limit=10&search=${search}`,
        "GET"
      );
      const { users, totalPages: total } = response.data;
      setUsers(users);
      setTotalPages(total);
      showToast("Users fetched successfully", "success");
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await apiRequest(`user/${userId}`, "DELETE");
      showToast("User deleted successfully!", "success");
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Failed to delete user:", error.message);
      showToast("Failed to delete user.", "error");
    }
  };

  // Update user
  const handleUpdateUser = async (userId, updatedDetails) => {
    try {
      await apiRequest(`user/${userId}`, "PUT", updatedDetails);
      showToast("User details updated successfully!", "success");
      setEditUser(null); // Close edit mode
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Failed to update user:", error.message);
      showToast("Failed to update user.", "error");
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchUsers();
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
              placeholder="Search for users..."
              className="w-full p-3 pl-10 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </span>
          </div>
        </div>
      </div>

      {/* User List */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-extrabold text-blue-900 dark:text-white mb-6">
          User Management
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {editUser === user._id ? (
                  <div>
                    {/* Edit Mode */}
                    <input
                      type="text"
                      placeholder="Full Name"
                      defaultValue={user.fullname}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) => (user.fullname = e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      defaultValue={user.email}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) => (user.email = e.target.value)}
                    />
                    <select
                      defaultValue={user.role}
                      className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                      onChange={(e) => (user.role = e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleUpdateUser(user._id, user)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUser(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* View Mode */}
                    <h3 className="text-lg font-bold text-blue-900 dark:text-white mb-2">
                      {user.fullname}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Email: <span className="font-medium">{user.email}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Role: <span className="font-medium">{user.role}</span>
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setEditUser(user._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <Edit3 className="inline w-5 h-5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <Trash2 className="inline w-5 h-5" /> Delete
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

export default UsersPage;
