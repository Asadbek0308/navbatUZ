import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-lg transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="NavbatUZ" className="h-8 w-auto" />
        </NavLink>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-600 pb-2 hover:border-b border-blue-600"
              }`
            }
          >
            Bosh sahifa
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-600 pb-2 hover:border-b border-blue-600"
              }`
            }
          >
            Xarita
          </NavLink>

          <NavLink
            to="/my-turn"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-600 pb-2 hover:border-b border-blue-600"
              }`
            }
          >
            Mening navbatim
          </NavLink>

          <NavLink
            to="/rating"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-600 pb-2 hover:border-b border-blue-600"
              }`
            }
          >
            Reyting
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">

          {/* Theme Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              // Sun icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
            ) : (
              // Moon icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>

          <NavLink to="/registration">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Kirish
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;