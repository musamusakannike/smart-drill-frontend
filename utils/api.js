const BASE_URL = "https://smart-drill-backend.onrender.com/api/v1";

/**
 * Utility function to send API requests to the backend.
 * @param {string} endpoint - The API endpoint (relative to BASE_URL).
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} [body] - The request body (for POST, PUT, etc.).
 * @param {object} [headers] - Additional headers if needed.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */

export const apiRequest = async (
  endpoint,
  method,
  body = null,
  headers = {},
  needsToken = true
) => {
  const token = localStorage.getItem("token");

  if (!token && needsToken) {
    throw new Error("Session expired. Please login again.");
  }

  const url = `${BASE_URL}/${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Parse response error data
      const errorData = await response.json();

      // Log detailed error to console for developers
      console.error("API request failed:", {
        url,
        status: response.status,
        message: errorData.message,
      });

      // Throw a generic error message
      const genericMessage =
        response.status === 401
          ? "Unauthorized access. Please check your credentials."
          : response.status === 403
          ? "You do not have permission to perform this action."
          : response.status >= 500
          ? "A server error occurred. Please try again later."
          : "An error occurred while processing your request. Please try again.";

      throw new Error(genericMessage);
    }

    return await response.json();
  } catch (error) {
    // Additional fallback for unexpected errors
    console.error("Unexpected error:", error);
    throw new Error(error);
  }
};
