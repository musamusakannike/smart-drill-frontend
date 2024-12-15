"use client";

import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { Loader, Send } from "lucide-react";

const ChatWithAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    // Append the user's message to the chat
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input field
    setLoading(true);

    try {
      const response = await apiRequest("questions/solve", "POST", {
        question: input.trim(),
      });

      // Append the AI's response to the chat
      const aiMessage = {
        role: "ai",
        content: response.solution.explanation,
        keyPoints: response.solution.keyPoints,
        relatedTopics: response.relatedTopics,
        references: response.solution.references,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to fetch AI response:", error.message);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Failed to fetch a solution. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-2 md:px-3 lg:px-6 py-10">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-8">
          Chat with AI
        </h2>

        {/* Chat Window */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 md:p-4 lg:p-6 max-h-[70vh] overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Ask a question to start the conversation.
            </p>
          )}
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
              key={index}
              className={`p-4 rounded-md ${
                msg.role === "user"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 self-end"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {/* Main content */}
              <p>{msg.content}</p>
            
              {/* Key Points */}
              {msg.role === "ai" && msg.keyPoints && (
                <ul className="list-disc list-inside mt-2">
                  {msg.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            
              {/* Related Topics */}
              {msg.role === "ai" && msg.relatedTopics && (
                <p className="text-sm mt-2">
                  <strong>Related Topics:</strong> {msg.relatedTopics.join(", ")}
                </p>
              )}
            
              {/* References */}
              {msg.role === "ai" && msg.references && msg.references.length > 0 && (
                <div className="mt-2">
                  <strong className="text-sm">References:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {msg.references.map((ref, i) => (
                      <li key={i}>
                        <a
                          href={ref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 underline text-sm"
                        >
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>            
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-6 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;
