"use client";

import { useState } from "react";
import { apiRequest } from "@/utils/api";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    university: "",
    course: "",
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
      const response = await apiRequest(
        "auth/signup",
        "POST",
        formData,
        {},
        false
      );
      setMessage({
        type: "success",
        text: "Sign up successful! Redirecting to Login...",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (error) {
      console.log("Error: " + error)
      setMessage({
        type: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-[#7072c4] dark:text-gray-200 mb-4">
          Smart<span className="text-blue-600">Drill</span>
        </h1>
        <h1 className="text-2xl font-bold text-center text-blue-900 dark:text-blue-300 mb-2">
          Create an Account
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Full Name Input */}
          <div className="relative">
            <label
              htmlFor="fullname"
              className="absolute top-0 left-3 text-sm bg-white dark:bg-gray-800 px-1 -translate-y-2 text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Username Input */}
          <div className="relative">
            <label
              htmlFor="username"
              className="absolute top-0 left-3 text-sm bg-white dark:bg-gray-800 px-1 -translate-y-2 text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Input */}
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* University Input */}
          <div className="relative">
            <label
              htmlFor="university"
              className="absolute top-0 left-3 text-sm bg-white dark:bg-gray-800 px-1 -translate-y-2 text-gray-700 dark:text-gray-300"
            >
              University
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your university"
              required
            />
          </div>

          {/* Course Input */}
          <div className="relative">
            <label
              htmlFor="course"
              className="absolute top-0 left-3 text-sm bg-white dark:bg-gray-800 px-1 -translate-y-2 text-gray-700 dark:text-gray-300"
            >
              Course of Study
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your course of study"
              required
            />
          </div>

          {/* Password Input */}
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-2 text-center text-sm ${
              message.type === "success"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            } rounded-md`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;

// "use client";

// import { useState } from "react";
// import { apiRequest } from "@/utils/api";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     fullname: "",
//     username: "",
//     email: "",
//     university: "",
//     course: "",
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
//       const response = await apiRequest("auth/signup", "POST", formData, {}, false);
//       setMessage({
//         type: "success",
//         text: "Sign up successful! Redirecting to Login...",
//       });
//       setTimeout(() => {
//         window.location.href = "/login";
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
//           Create an Account
//         </h1>
//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           {/* Full Name Input */}
//           <div>
//             <label
//               htmlFor="fullname"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullname"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           {/* Username Input */}
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

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

//           {/* University Input */}
//           <div>
//             <label
//               htmlFor="university"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               University
//             </label>
//             <input
//               type="text"
//               id="university"
//               name="university"
//               value={formData.university}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               placeholder="Enter your university name"
//               required
//             />
//           </div>

//           {/* Course Input */}
//           <div>
//             <label
//               htmlFor="course"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Course
//             </label>
//             <input
//               type="text"
//               id="course"
//               name="course"
//               value={formData.course}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               placeholder="Enter your course of study"
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
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button>
//           </div>
//         </form>

// {/* Message */}
// {message && (
//   <div
//     className={`mt-4 p-2 text-center text-sm ${
//       message.type === "success"
//         ? "text-green-700 bg-green-100"
//         : "text-red-700 bg-red-100"
//     } rounded-md`}
//   >
//     {message.text}
//   </div>
// )}

//         {/* Login Redirect */}
//         <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-blue-600 dark:text-blue-400 hover:underline"
//           >
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
