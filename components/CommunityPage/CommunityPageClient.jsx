"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api";

const CommunityPageClient = ({ communityId }) => {
  const [community, setCommunity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCommunityData = async () => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `communities/${communityId}/messages`,
        "GET"
      );
      setCommunity(response.data.community);
      setMessages(response.data.messages);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Failed to fetch community messages:", error.message);
      setError("Failed to load community messages.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await apiRequest(
        `communities/${communityId}/chat`,
        "POST",
        { message: newMessage }
      );
      setMessages((prev) => [...prev, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
      alert("Failed to send message.");
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [communityId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-blue-900 dark:text-blue-300">
          Loading messages...
        </p>
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
          onClick={fetchCommunityData}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-4">
          {community?.name}
        </h1>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          {community?.description}
        </p>

        {/* Messages List */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 max-h-96 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 mb-2 ${
                  msg.sender?._id === community?.createdBy._id
                    ? "text-blue-900 dark:text-blue-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                <p className="font-bold">{msg.sender?.fullname || "Unknown"}</p>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No messages yet. Be the first to post!
            </p>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPageClient
