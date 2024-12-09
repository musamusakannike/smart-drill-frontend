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

  if (!token) {
    if (needsToken) {
      throw new Error("Your session has expired. Please login again.");
    }
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
      const errorData = await response.json();
      throw new Error(`${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
