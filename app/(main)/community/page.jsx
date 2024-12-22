"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import Link from "next/link";

const CommunityPage = () => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [otherCommunities, setOtherCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch communities
  const fetchCommunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest("communities", "GET");
      const { joinedCommunities, otherCommunities } = response.data;
      console.log("JOINED COMMUNITIES: " + joinedCommunities);
      console.log("OTHER COMMUNITIES: " + otherCommunities);
      setJoinedCommunities(joinedCommunities);
      setOtherCommunities(otherCommunities);
    } catch (error) {
      console.error("Failed to fetch communities:", error.message);
      setError("Failed to load communities.");
    } finally {
      setLoading(false);
    }
  };

  // Join a community
  const handleJoinCommunity = async (communityId) => {
    try {
      await apiRequest(`communities/${communityId}/join`, "PUT");
      alert("You have successfully joined the community!");
      fetchCommunities(); // Refresh the list
    } catch (error) {
      console.error("Failed to join community:", error.message);
      alert("Failed to join the community. Please try again.");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">
          Communities
        </h1>

        {/* Joined Communities */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Your Communities
          </h2>
          {joinedCommunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.map((community) => (
                <Link
                  href={`/community/${community._id}`}
                  key={community._id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-2">
                    {community.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {community.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Members: {community.members.length}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              You have not joined any communities yet.
            </p>
          )}
        </section>

        {/* Other Communities */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Other Communities
          </h2>
          {otherCommunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCommunities.map((community) => (
                <div
                  key={community._id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-2">
                    {community.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {community.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Members: {community.members.length}
                  </p>
                  <button
                    onClick={() => handleJoinCommunity(community._id)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No other communities available to join.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
