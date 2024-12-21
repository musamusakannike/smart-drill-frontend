"use client";

import { useState } from "react";
import { apiRequest } from "@/utils/api";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await apiRequest("auth/login", "POST", formData, {}, false);
      localStorage.setItem("token", response.data.token);
      setMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-center text-[#7072c4] dark:text-gray-200 mb-4">
          Smart<span className="text-blue-600">Drill</span>
        </h1>
        <header className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300 mb-2">
          Log In
        </header>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute top-0 left-3 text-sm bg-white dark:bg-gray-800 px-1 -translate-y-2 text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="absolute top-0 left-3 text-sm bg-white dark:bg-gray-800 px-1 -translate-y-2 text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;


// "use client";

// import { useState } from "react";
// import { apiRequest } from "@/utils/api";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await apiRequest("auth/login", "POST", formData, {}, false);
//       localStorage.setItem("token", response.data.token);
//       setMessage({
//         type: "success",
//         text: "Login successful! Redirecting...",
//       });
//       setTimeout(() => {
//         window.location.href = "/dashboard"; // Redirect to dashboard or another page
//       }, 1200);
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: error.message || "An error occurred. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
//         <h1 className="text-2xl font-bold text-center text-blue-900 dark:text-blue-300">
//           Welcome Back
//         </h1>
//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100 dark:focus:ring-offset-gray-800"
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>
//           </div>
//         </form>

//         {/* Message */}
//         {message && (
//           <div
//             className={`mt-4 p-2 text-center text-sm ${
//               message.type === "success"
//                 ? "text-green-700 bg-green-100"
//                 : "text-red-700 bg-red-100"
//             } rounded-md`}
//           >
//             {message.text}
//           </div>
//         )}

//         {/* Signup Redirect */}
//         <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//           Don&apos;t have an account?{" "}
//           <a
//             href="/signup"
//             className="text-blue-600 dark:text-blue-400 hover:underline"
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
