const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-blue-900 dark:text-white">
          Unlock <span className="text-blue-500">Premium Features</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Gain access to all the tools you need to excel—mock tests, past 
          questions, AI-powered solutions, and more—all for a simple monthly 
          subscription.
        </p>

        {/* Pricing Card */}
        <div className="mt-12 grid place-items-center">
          <div className="p-8 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-xl transition-shadow relative max-w-lg">
            <h3 className="text-2xl font-semibold">Premium Plan</h3>
            <p className="mt-2">
              Enjoy unlimited access to all features with our single subscription plan.
            </p>
            <div className="mt-6 text-5xl font-bold">
              ₦1500<span className="text-lg text-blue-200">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-blue-200">
              <li>✔ Unlimited access to all past questions</li>
              <li>✔ Mock test generation</li>
              <li>✔ AI-powered explanations</li>
              <li>✔ Progress tracking and analytics</li>
              <li>✔ Priority support</li>
            </ul>
            <button className="mt-8 w-full px-6 py-3 bg-white text-blue-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
