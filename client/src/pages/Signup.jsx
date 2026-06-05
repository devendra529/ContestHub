// client/src/pages/Signup.jsx

import { useEffect }   from "react";
import { useNavigate } from "react-router-dom";
import { useAuth }     from "../context/AuthContext";
import SignupForm      from "../components/auth/SignupForm";

const Signup = () => {
  const { isAuthenticated } = useAuth();
  const navigate            = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex dark:bg-dark-200 bg-gray-50">

      {/* left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br
                      from-primary-600 via-primary-700 to-dark-200
                      flex-col items-center justify-center p-12 relative overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full
                          bg-white blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full
                          bg-primary-300 blur-3xl" />
        </div>

        <div className="relative z-10 text-white max-w-sm">
          <div className="text-6xl mb-6 text-center">🚀</div>
          <h2 className="text-4xl font-bold mb-4 text-center">
            Start Competing
          </h2>
          <p className="text-primary-200 text-lg leading-relaxed text-center mb-8">
            Join thousands of competitive programmers who
            track their contests on ContestHub.
          </p>

          {/* feature list */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "📅", text: "Track contests from 3 platforms" },
              { icon: "🔖", text: "Bookmark contests you want to join" },
              { icon: "📝", text: "Write notes for contest prep" },
              { icon: "⏰", text: "Get email reminders before contests" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-primary-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right side — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-4xl">🏆</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              ContestHub
            </h1>
          </div>

          <div className="bg-white dark:bg-dark-100 rounded-2xl shadow-xl
                          border border-gray-100 dark:border-gray-700/50 p-8">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                Free forever. No credit card needed.
              </p>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;

