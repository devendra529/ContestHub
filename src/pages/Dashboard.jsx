// client/src/pages/Dashboard.jsx

import { useAuth } from "../context/AuthContext";

import useContests from "../hooks/useContests";

import Layout from "../components/layout/Layout";

import ContestList from "../components/contest/ContestList";

import ContestFilter from "../components/contest/ContestFilter";

import SearchBar from "../components/ui/SearchBar";

import Button from "../components/ui/Button";

// Greeting Helper
const getGreeting = () => {

  const hour =
    new Date().getHours();

  if (hour < 12) {

    return "morning";
  }

  if (hour < 17) {

    return "afternoon";
  }

  return "evening";
};

// Icons
const RefreshIcon = () => (

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
      d="
        M4 4v5h.582
        m15.356 2
        A8.001 8.001 0 004.582 9
        m0 0H9
        m11 11v-5h-.581
        m0 0
        a8.003 8.003 0 01-15.357-2
        m15.357 2H15
      "
    />

  </svg>
);

const CloseIcon = () => (

  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="
        M6 18L18 6
        M6 6l12 12
      "
    />

  </svg>
);

const Dashboard = () => {

  const { user } =
    useAuth();

  const {

    filteredContests,

    isLoading,

    error,

    filters,

    updateFilter,

    clearFilters,

    fetchContests,

  } = useContests();

  // Contest Counts
  const upcomingCount =

    filteredContests.filter(

      (contest) =>

        contest.status ===
        "upcoming"

    ).length;

  const liveCount =

    filteredContests.filter(

      (contest) =>

        contest.status ===
        "live"

    ).length;

  const pastCount =

    filteredContests.filter(

      (contest) =>

        contest.status ===
        "past"

    ).length;

  // Active Filters
  const hasActiveFilter =

    filters.platform !==
      "all" ||

    filters.status !==
      "all" ||

    filters.search !==
      "";

  return (

    <Layout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="
            flex flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-4
            mb-8
          "
        >

          {/* Left */}
          <div>

            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >

              Good
              {" "}

              {getGreeting()},

              {" "}

              {
                user?.name
                  ?.split(" ")[0]
              }

              {" "}

              👋

            </h1>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
                mt-1
              "
            >

              Here are all upcoming coding contests

            </p>

          </div>

          {/* Refresh */}
          <Button
            onClick={
              fetchContests
            }

            variant="secondary"

            size="sm"

            isLoading={
              isLoading
            }
          >

            <RefreshIcon />

            Refresh

          </Button>

        </div>

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-4
            mb-8
          "
        >

          {[
            {
              label: "Upcoming",

              count: upcomingCount,

              color:
                "text-primary-500",

              border:
                "border-primary-500/20",
            },

            {
              label: "Live Now",

              count: liveCount,

              color:
                "text-green-500",

              border:
                "border-green-500/20",
            },

            {
              label: "Ended",

              count: pastCount,

              color:
                "text-gray-400",

              border:
                "border-gray-500/20",
            },

          ].map((stat) => (

            <div
              key={stat.label}

              className={`
                rounded-2xl
                p-5
                text-center
                bg-white
                dark:bg-dark-100
                border
                ${stat.border}
              `}
            >

              <p
                className={`
                  text-3xl
                  font-bold
                  ${stat.color}
                `}
              >

                {stat.count}

              </p>

              <p
                className="
                  text-xs
                  text-gray-400
                  dark:text-gray-500
                  mt-1
                "
              >

                {stat.label}

              </p>

            </div>

          ))}

        </div>

        {/* Search + Filters */}
        <div
          className="
            bg-white
            dark:bg-dark-100
            rounded-2xl
            p-4
            border
            border-gray-100
            dark:border-gray-700/50
            mb-6
            flex
            flex-col
            gap-4
          "
        >

          {/* Search */}
          <SearchBar
            value={
              filters.search
            }

            onChange={(value) =>

              updateFilter(
                "search",
                value
              )

            }

            placeholder="
              Search contests...
            "
          />

          {/* Filters */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              justify-between
              gap-3
            "
          >

            <ContestFilter />

            {/* Clear Filters */}
            {hasActiveFilter && (

              <button
                onClick={
                  clearFilters
                }

                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  text-gray-400
                  hover:text-red-500
                  transition-colors
                "
              >

                <CloseIcon />

                Clear Filters

              </button>

            )}

          </div>

        </div>

        {/* Error */}
        {error && (

          <div
            className="
              mb-6
              flex
              items-center
              gap-3
              rounded-xl
              p-4
              bg-red-50
              dark:bg-red-500/10
              border
              border-red-200
              dark:border-red-500/20
            "
          >

            <span
              className="
                text-red-500
                text-lg
              "
            >

              ⚠️

            </span>

            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-red-700
                  dark:text-red-400
                "
              >

                Failed to load contests

              </p>

              <p
                className="
                  text-xs
                  text-red-500
                  mt-0.5
                "
              >

                {error}

              </p>

            </div>

            {/* Retry */}
            <button
              onClick={
                fetchContests
              }

              className="
                ml-auto
                text-sm
                font-medium
                text-red-500
                underline
                hover:text-red-600
              "
            >

              Retry

            </button>

          </div>

        )}

        {/* Count */}
        {!isLoading &&
          !error && (

          <p
            className="
              text-sm
              text-gray-400
              dark:text-gray-500
              mb-4
            "
          >

            Showing
            {" "}

            <span
              className="
                font-medium
                text-gray-700
                dark:text-gray-300
              "
            >

              {
                filteredContests.length
              }

            </span>

            {" "}

            contests

          </p>

        )}

        {/* Contest Grid */}
        <ContestList
          contests={
            filteredContests
          }

          isLoading={
            isLoading
          }
        />

      </div>

    </Layout>

  );
};

export default Dashboard;
