import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo or Site Title */}
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Your Project Name
                </h1>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Your Project
          </h1>
          
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
            A brief description of your project or platform goes here.
          </p>
          
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                to="/about"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Key Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Discover what makes our project unique
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-blue-500 text-white rounded-full">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Feature One
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Description of the first key feature
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-green-500 text-white rounded-full">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Feature Two
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Description of the second key feature
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-purple-500 text-white rounded-full">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Feature Three
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Description of the third key feature
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Your Project Name. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link to="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;