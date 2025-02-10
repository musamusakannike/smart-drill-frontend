const BASE_URL = "https://smart-drill-backend.onrender.com/api/v1";
// const BASE_URL = "http://localhost:8080/api/v1";

/**
 * Utility function to send API requests to the backend.
 * @param {string} endpoint - The API endpoint (relative to BASE_URL).
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} [body] - The request body (for POST, PUT, etc.).
 * @param {object} [headers] - Additional headers if needed.
 * @param {boolean} [needsToken] - Whether the request requires a token.
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
  // Safely access localStorage only on the client-side
  const accessToken =
    typeof window !== "undefined" && needsToken
      ? localStorage.getItem("accessToken")
      : null;

  if (!accessToken && needsToken) {
    throw new Error("Session expired. Please login again.");
  }

  const url = `${BASE_URL}/${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(needsToken && accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    // If token is expired (401), try refreshing it
    if (response.status === 401 && needsToken) {
      console.warn("Access token expired, attempting to refresh...");

      const refreshed = await refreshAccessToken(); // Call the refresh token logic
      if (refreshed) {
        // Retry the original request with a new token
        return await apiRequest(endpoint, method, body, headers, needsToken);
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "An error occurred while processing your request."
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error; // Re-throw error for higher-level handling
  }
};

/**
 * Function to refresh the access token using the refresh token.
 */
const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include", // Include refresh token in cookies
    });

    if (!response.ok) {
      console.error("Failed to refresh access token:", response.status);
      throw new Error("Session expired. Please login again.");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.data.accessToken); // Update token
    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    localStorage.removeItem("accessToken"); // Clear token on failure
    window.location.href = "/login"; // Redirect to login
    return false;
  }
};
