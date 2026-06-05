// client/src/pages/NotFound.jsx

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                     bg-white dark:bg-dark-200 text-center px-4">
      <p className="text-8xl font-bold text-primary-500 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-primary-500 text-white rounded-lg
                   hover:bg-primary-600 transition-colors font-medium"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;

