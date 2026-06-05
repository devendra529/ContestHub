// client/src/components/layout/Sidebar.jsx

import { NavLink }    from "react-router-dom";
import useContests from "../../hooks/useContests";

const navItems = [
  {
    to   : "/dashboard",
    label: "Dashboard",
    icon : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to   : "/bookmarks",
    label: "Bookmarks",
    icon : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  },
  {
    to   : "/notes",
    label: "Notes",
    icon : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    to   : "/profile",
    label: "Profile",
    icon : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { filteredContests } = useContests();

  // count live contests for the badge
  const liveCount = filteredContests.filter((c) => c.status === "live").length;

  return (
    <>
      {/* mobile overlay */}
      {isOpen && (
        <div
          className = "fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick   = {onClose}
        />
      )}

      {/* sidebar panel */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64
        bg-white dark:bg-dark-200
        border-r border-gray-200 dark:border-gray-700/50
        flex flex-col transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* logo */}
        <div className="h-16 flex items-center gap-3 px-6
                        border-b border-gray-200 dark:border-gray-700/50
                        flex-shrink-0">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="font-bold text-gray-900 dark:text-white leading-tight">
              ContestHub
            </p>
            <p className="text-xs text-gray-400">Contest Aggregator</p>
          </div>
        </div>

        {/* nav links */}
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">

          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500
                        uppercase tracking-wider px-3 mb-2">
            Menu
          </p>

          {navItems.map((item) => (
            <NavLink
              key       = {item.to}
              to        = {item.to}
              onClick   = {onClose}
              className = {({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl
                text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-primary-500/10 text-primary-500"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              {item.icon}
              {item.label}

              {/* live badge on Dashboard link */}
              {item.to === "/dashboard" && liveCount > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center
                                  rounded-full bg-green-500 text-white text-xxs font-bold">
                  {liveCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* bottom info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                          bg-primary-500/5 border border-primary-500/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {filteredContests.length} contests loaded
            </span>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;

