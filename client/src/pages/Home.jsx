// client/src/pages/Home.jsx

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Features
const features = [

  {
    icon: "⚡",

    title: "Real-time Aggregation",

    desc:
      "Contests from Codeforces, LeetCode, and CodeChef — fetched live and updated automatically.",
  },

  {
    icon: "🔖",

    title: "Smart Bookmarks",

    desc:
      "Save contests you care about and access them anytime.",
  },

  {
    icon: "📝",

    title: "Personal Notes",

    desc:
      "Keep preparation notes for every contest in one place.",
  },

  {
    icon: "⏰",

    title: "Contest Reminders",

    desc:
      "Never miss a contest with timely reminders and alerts.",
  },

  {
    icon: "🌙",

    title: "Dark Mode",

    desc:
      "Built for late-night coding sessions with elegant dark mode.",
  },

  {
    icon: "📊",

    title: "Track Activity",

    desc:
      "Monitor your bookmarks, notes, and contest activity.",
  },

];

const Home = () => {

  const { isAuthenticated } =
    useAuth();

  return (

    <div
      className="
        min-h-screen

        bg-gray-50 dark:bg-dark-200

        text-gray-900 dark:text-white
      "
    >

      {/* Navbar */}
      <nav
        className="
          sticky top-0 z-50

          border-b border-gray-200
          dark:border-gray-700/50

          bg-white/80 dark:bg-dark-200/80

          backdrop-blur-md
        "
      >

        <div
          className="
            max-w-6xl mx-auto

            h-16

            px-4

            flex items-center justify-between
          "
        >

          {/* Logo */}
          <div className="flex items-center gap-2">

            <span className="text-2xl">
              🏆
            </span>

            <span
              className="
                text-xl font-bold
              "
            >

              ContestHub

            </span>

          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-3">

            {isAuthenticated ? (

              <Link
                to="/dashboard"
                className="
                  px-4 py-2

                  rounded-lg

                  bg-primary-500

                  text-sm font-medium
                  text-white

                  hover:bg-primary-600

                  transition-colors
                "
              >

                Dashboard

              </Link>

            ) : (

              <>

                <Link
                  to="/login"
                  className="
                    px-4 py-2

                    text-sm font-medium

                    text-gray-600 dark:text-gray-300

                    hover:text-primary-500

                    transition-colors
                  "
                >

                  Sign In

                </Link>

                <Link
                  to="/signup"
                  className="
                    px-4 py-2

                    rounded-lg

                    bg-primary-500

                    text-sm font-medium
                    text-white

                    hover:bg-primary-600

                    transition-colors
                  "
                >

                  Get Started

                </Link>

              </>

            )}

          </div>

        </div>

      </nav>

      {/* Hero Section */}
      <section
        className="
          max-w-6xl mx-auto

          px-4 py-24

          text-center
        "
      >

        {/* Badge */}
        <div
          className="
            inline-flex items-center gap-2

            px-4 py-1.5

            rounded-full

            bg-primary-500/10

            border border-primary-500/20

            text-sm font-medium
            text-primary-500

            mb-6
          "
        >

          <span
            className="
              w-2 h-2

              rounded-full

              bg-primary-500

              animate-pulse
            "
          />

          Live contests from multiple platforms

        </div>

        {/* Heading */}
        <h1
          className="
            text-5xl md:text-6xl

            font-bold

            leading-tight

            mb-6
          "
        >

          All Your Coding Contests

          <br />

          <span className="text-primary-500">

            In One Place

          </span>

        </h1>

        {/* Description */}
        <p
          className="
            max-w-2xl mx-auto

            text-lg md:text-xl

            leading-relaxed

            text-gray-500 dark:text-gray-400

            mb-10
          "
        >

          Stop juggling tabs. ContestHub
          aggregates coding contests from
          Codeforces, LeetCode, and CodeChef
          into one clean dashboard.

        </p>

        {/* Buttons */}
        <div
          className="
            flex flex-col sm:flex-row

            justify-center

            gap-4
          "
        >

          <Link
            to="/signup"
            className="
              px-8 py-4

              rounded-xl

              bg-primary-500

              text-base font-semibold
              text-white

              hover:bg-primary-600
              hover:scale-105

              transition-all

              shadow-lg shadow-primary-500/20
            "
          >

            Start for Free →

          </Link>

          <Link
            to="/login"
            className="
              px-8 py-4

              rounded-xl

              bg-white dark:bg-dark-100

              border border-gray-200
              dark:border-gray-700

              text-base font-semibold

              text-gray-700 dark:text-gray-300

              hover:border-primary-500

              transition-all
            "
          >

            Sign In

          </Link>

        </div>

      </section>

      {/* Features */}
      <section
        className="
          max-w-6xl mx-auto

          px-4 pb-24
        "
      >

        {/* Section Header */}
        <div className="text-center mb-16">

          <h2
            className="
              text-3xl font-bold

              mb-4
            "
          >

            Everything you need

          </h2>

          <p
            className="
              max-w-xl mx-auto

              text-gray-500 dark:text-gray-400
            "
          >

            Built for competitive programmers
            who want a cleaner way to track
            coding contests.

          </p>

        </div>

        {/* Feature Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3

            gap-6
          "
        >

          {features.map((feature) => (

            <div
              key={feature.title}
              className="
                rounded-2xl

                p-6

                bg-white dark:bg-dark-100

                border border-gray-200
                dark:border-gray-700/50

                hover:border-primary-500/40

                hover:-translate-y-1

                transition-all duration-200
              "
            >

              <span
                className="
                  text-3xl

                  block

                  mb-4
                "
              >

                {feature.icon}

              </span>

              <h3
                className="
                  mb-2

                  font-semibold
                "
              >

                {feature.title}

              </h3>

              <p
                className="
                  text-sm

                  leading-relaxed

                  text-gray-500 dark:text-gray-400
                "
              >

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer
        className="
          border-t border-gray-200
          dark:border-gray-700/50
        "
      >

        <div
          className="
            max-w-6xl mx-auto

            px-4 py-6

            flex flex-col sm:flex-row

            items-center justify-between

            gap-4
          "
        >

          {/* Left */}
          <div
            className="
              flex items-center gap-2

              text-sm

              text-gray-400
            "
          >

            <span>🏆</span>

            <span>

              ContestHub — Built by
              {" "}
              Devendra Pratap Singh

            </span>

          </div>

          {/* GitHub */}
          <a
            href="https://github.com/devendra529/ContestHub"
            target="_blank"
            rel="noreferrer"
            className="
              text-sm

              text-gray-400

              hover:text-primary-500

              transition-colors
            "
          >

            GitHub →

          </a>

        </div>

      </footer>

    </div>

  );
};

export default Home;

