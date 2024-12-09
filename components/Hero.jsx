"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 lg:min-h-[100vh]">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-400">Smart</span>
          <span className="text-blue-900 dark:text-blue-300">Drill</span>
        </h1>
        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="block lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Menu Links (Desktop) */}
        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            >
              Pricing
            </a>
          </li>
          <li>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Dropdown Menu (Mobile) */}
        {isMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-white dark:bg-gray-900 shadow-lg lg:hidden z-10">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center mt-6 ">
        <span className="px-4 py-1 bg-blue-200 text-blue-900 dark:bg-blue-300 dark:text-blue-900 text-sm font-semibold rounded-full shadow-md mb-4 inline-block">
          New Feature Launched!
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-blue-900 dark:text-white">
          Your Gateway to <span className="text-blue-400">Exam Success</span>,
          <br />
          at<span className="text-blue-500"> Unilorin!</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          Access past questions, take mock tests, and get AI-powered
          explanations to sharpen your understanding. SmartDrill is your
          ultimate study companion.
        </p>
        {/* Buttons */}
        <div className="mt-8 space-x-4">
          <Link href={"/signup"} className="my-2 px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-blue-700 transition-all">
            Get Started
          </Link>
          <Link href={"/login"} className="my-2 px-6 py-3 bg-white text-blue-600 font-medium text-lg rounded-md shadow-md hover:bg-gray-100 transition-all dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Login
          </Link>
        </div>
        {/* <div className="w-full flex justify-around mt-5">
          <span className="p-1 rounded-full bg-gray-700 text-gray-300">
            📚 10,000+ Past Questions Available
          </span>
          <span className="p-1 rounded-full bg-gray-700 text-gray-300">
            🧠 AI-Powered Learning Tools
          </span>
          <span className="p-1 rounded-full bg-gray-700 text-gray-300">
            📈 Personalized Progress Analytics
          </span>
        </div> */}
        {/* Illustration */}
        <div className="mt-12">
          <img
            src="/hero.jpg"
            alt="SmartDrill Dashboard Preview"
            className="w-full max-w-4xl mx-auto drop-shadow-lg rounded-t-[50px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
