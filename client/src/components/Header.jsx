import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="MindBodyMatch Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold tracking-wide">MindBodyMatch</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <Link to="/therapists" className="hover:underline">
            Therapists
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Call-to-Action Buttons */}
        <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
          <Link
            to="/signup"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100"
          >
            Sign Up
          </Link>
          
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-700 rounded-lg shadow hover:bg-blue-800"
          >
            Log In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Open Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-blue-500 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Find Your Perfect Therapist</h2>
        <p className="text-lg mb-6">
          Explore qualified therapists and personalized services to support your mental and physical health.
        </p>
        <div className="space-x-4">
          <Link
            to="/explore"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100"
          >
            Get Started
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
