"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/contexts/ToastContext";

const AdminCommunitiesPage = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(null);
  const [editDetails, setEditDetails] = useState({ name: "", description: "" });
  const {  showToast } = useToast();

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("communities/all", "GET");
      setCommunities(response.data.communities);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch communities:", error.message);
      setError("Failed to load communities.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (communityId) => {
    if (!confirm("Are you sure you want to delete this community?")) return;

    try {
      await apiRequest(`communities/${communityId}`, "DELETE");
      setCommunities((prev) => prev.filter((comm) => comm._id !== communityId));
    } catch (error) {
      console.error("Failed to delete community:", error.message);
      showToast("Failed to delete community.", "error");
    }
  };

  const handleEditClick = (community) => {
    setEditMode(true);
    setEditingCommunity(community._id);
    setEditDetails({
      name: community.name,
      description: community.description,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await apiRequest(
        `communities/${editingCommunity}`,
        "PUT",
        editDetails
      );
      setCommunities((prev) =>
        prev.map((comm) =>
          comm._id === editingCommunity ? response.data.community : comm
        )
      );
      setEditMode(false);
      setEditingCommunity(null);
    } catch (error) {
      console.error("Failed to edit community:", error.message);
      showToast("Failed to save changes.");
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-blue-900 dark:text-blue-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-center text-xl text-red-600 dark:text-red-400 mb-4">
          {error}
        </p>
        <button
          onClick={fetchCommunities}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex w-full justify-between items-center flex-col md:flex-row mb-3">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8">
            Manage Communities
          </h1>
          <Link
            href={"/admin/communities/new"}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 font-semibold text-lg"
          >
            <PlusCircle /> Add Community
          </Link>
        </div>

        {editMode ? (
          <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-md shadow">
            <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-4">
              Edit Community
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editDetails.name}
                onChange={(e) =>
                  setEditDetails((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Community Name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
              <textarea
                value={editDetails.description}
                onChange={(e) =>
                  setEditDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Community Description"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {communities.map((community) => (
              <div
                key={community._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow flex flex-col md:flex-row gap-y-3 justify-between items-center"
              >
                <div className="w-full">
                  <h2 className="text-lg font-bold text-blue-900 dark:text-white">
                    {community.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-400">
                    {community.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created by: {community.createdBy?.fullname || "Unknown"}
                  </p>
                </div>
                <div className="flex md:justify-end gap-2 w-full">
                  <button
                    onClick={() => handleEditClick(community)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full md:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(community._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 w-full md:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCommunitiesPage;
