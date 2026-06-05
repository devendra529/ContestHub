import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users
  useEffect(() => {

    if (isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });
    }

  }, [isAuthenticated, navigate]);

  return (

    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-200">

      {/* Left Side */}
      <div
        className="
          hidden lg:flex lg:w-1/2
          bg-gradient-to-br
          from-primary-600
          via-primary-700
          to-dark-200
          relative overflow-hidden
          flex-col items-center justify-center
          p-12
        "
      >

        {/* Background Blur */}
        <div className="absolute inset-0 opacity-10">

          <div
            className="
              absolute top-20 left-10
              w-64 h-64
              rounded-full
              bg-white
              blur-3xl
            "
          />

          <div
            className="
              absolute bottom-20 right-10
              w-80 h-80
              rounded-full
              bg-primary-300
              blur-3xl
            "
          />

        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white max-w-sm">

          <div className="text-6xl mb-6">
            🏆
          </div>

          <h2 className="text-4xl font-bold mb-4">
            ContestHub
          </h2>

          <p className="text-lg leading-relaxed text-primary-200">
            All your coding contests in one place.
            Never miss a Codeforces round again.
          </p>

          {/* Platform Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">

            {["Codeforces", "LeetCode", "CodeChef"].map((platform) => (

              <span
                key={platform}
                className="
                  px-4 py-1.5
                  rounded-full
                  bg-white/10
                  border border-white/20
                  text-sm font-medium
                "
              >
                {platform}
              </span>

            ))}

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">

            <span className="text-4xl">
              🏆
            </span>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              ContestHub
            </h1>

          </div>

          {/* Login Card */}
          <div
            className="
              bg-white dark:bg-dark-100
              rounded-2xl
              shadow-xl
              border border-gray-100 dark:border-gray-700/50
              p-8
            "
          >

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sign in to your ContestHub account
              </p>

            </div>

            <LoginForm />

          </div>

        </div>

      </div>

    </div>

  );
};

export default Login;

