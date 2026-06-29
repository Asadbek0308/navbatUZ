import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logo from "../assets/Logo NavbarUZ.svg";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (!e.target.closest("#avatar-menu")) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const handleProfileNav = () => {
    setDropdownOpen(false);
    navigate(user?.role === "haydovchi" ? "/profile" : "/station-dashboard");
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/");
  };

  const initials = user
    ? (user.role === "haydovchi" ? user.fullName : user.stationName)
        ?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U"
    : "";

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600 pb-2"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-600 pb-2 hover:border-b border-blue-600"
    }`;

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-lg transition-colors sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="NavbatUZ" className="h-8 w-auto" />
          <h1 className="text-[#00317E] text-2xl font-bold">NavbatUZ</h1>
        </NavLink>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navClass}>Bosh sahifa</NavLink>
          <NavLink to="/map" className={navClass}>Xarita</NavLink>
          <NavLink to="/my-turn" className={navClass}>Mening navbatim</NavLink>
          <NavLink to="/rating" className={navClass}>Reyting</NavLink>
        </nav>

        <div className="flex items-center gap-4">

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Auth: Avatar with dropdown OR Kirish button */}
          {user ? (
            <div id="avatar-menu" className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-10 h-10 rounded-full bg-blue-700 text-white text-sm font-bold flex items-center justify-center hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {initials}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">

                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                      {user.role === "haydovchi" ? "Haydovchi" : "Shaxobcha Egasi"}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {user.role === "haydovchi" ? user.fullName || "—" : user.stationName || "—"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.phone}</p>
                  </div>

                  {/* Profile link */}
                  <button
                    onClick={handleProfileNav}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {user.role === "haydovchi" ? "Mening profilim" : "Boshqaruv paneli"}
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition border-t border-gray-100 dark:border-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/registration">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                Kirish
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;