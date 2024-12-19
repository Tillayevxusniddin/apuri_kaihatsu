import React from "react";

const IntroductionPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Start your journey with{" "}
            <span className="text-green-500">Introduction</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            A modern and efficient admin management system for seamless university administration.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
              Admin page
            </button>
            <button className="text-gray-700 dark:text-gray-300 underline">
              Get started →
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/500x500"
            alt="Hero Section"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
          {/* User Comments */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow p-2 flex items-center gap-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Julia"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm font-medium text-gray-800">Julia</p>
            <span className="text-gray-600 text-sm">Fantastic theme!</span>
          </div>
          <div className="absolute bottom-4 left-8 bg-orange-500 text-white rounded-lg shadow p-2 flex items-center gap-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Michael"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm font-medium">Michael</p>
            <span className="text-sm">Excellent documentation 👏</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
