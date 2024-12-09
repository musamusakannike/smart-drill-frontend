const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-6 md:px-12 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-blue-900 dark:text-white">
          Why Choose <span className="text-blue-400">Smart</span>
          <span className="text-blue-600">Drill</span>?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-center text-gray-600 dark:text-gray-400">
          Experience smarter learning with powerful features designed to enhance
          your skills.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-lg shadow-md bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              AI-Powered Mock Tests
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Personalized, interactive tests designed to challenge your
              understanding and improve retention.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-lg shadow-md bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 16h10M5 12h14"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Past Question Bank
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Access thousands of past questions with detailed explanations to
              prepare like a pro.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-lg shadow-md bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-white">
              Ask AI Your Questions
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Get instant answers from our advanced AI assistant anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
