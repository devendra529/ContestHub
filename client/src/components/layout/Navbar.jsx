// client/src/components/layout/Navbar.jsx

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ onMenuToggle }) => {

  const { user, logout } = useAuth();

  const { isDark, toggleTheme } = useTheme();

  // Logout Handler
  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully");
  };

  return (

    <header
      className="
        sticky top-0 z-40

        flex items-center gap-4

        h-16 px-4

        bg-white/80 dark:bg-dark-200/80

        backdrop-blur-md

        border-b border-gray-200 dark:border-gray-700/50
      "
    >

      {/* Mobile Menu Button */}
      <button
        onClick={onMenuToggle}
        className="
          lg:hidden

          p-2

          rounded-lg

          text-gray-500 dark:text-gray-400

          hover:bg-gray-100 dark:hover:bg-dark-100

          transition-colors
        "
      >

        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />

        </svg>

      </button>

      {/* Mobile Logo */}
      <Link
        to="/dashboard"
        className="
          lg:hidden

          flex items-center gap-2

          font-bold

          text-gray-900 dark:text-white
        "
      >

        <span className="text-xl">
          🏆
        </span>

        <span>
          ContestHub
        </span>

      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Side */}
      <div className="flex items-center gap-2">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={
            isDark
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="
            p-2

            rounded-lg

            text-gray-500 dark:text-gray-400

            hover:bg-gray-100 dark:hover:bg-dark-100

            transition-colors
          "
        >

          {isDark ? (

            // Sun Icon
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />

            </svg>

          ) : (

            // Moon Icon
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />

            </svg>

          )}

        </button>

        {/* User Section */}
        <div
          className="
            flex items-center gap-2

            pl-3

            border-l border-gray-200 dark:border-gray-700
          "
        >

          {/* Avatar */}
          <div
            className="
              w-8 h-8

              rounded-full

              bg-primary-500

              flex items-center justify-center

              text-white
              text-sm font-bold

              flex-shrink-0
            "
          >

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          {/* User Name */}
          <span
            className="
              hidden sm:block

              max-w-[120px]

              truncate

              text-sm font-medium

              text-gray-700 dark:text-gray-300
            "
          >

            {user?.name}

          </span>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="
              p-2

              rounded-lg

              text-gray-400

              hover:text-red-500

              hover:bg-red-50 dark:hover:bg-red-500/10

              transition-colors
            "
          >

            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />

            </svg>

          </button>

        </div>

      </div>

    </header>

  );
};

export default Navbar;

