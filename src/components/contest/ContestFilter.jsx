// client/src/components/contest/ContestFilter.jsx

import useContests
from "../../hooks/useContests";

// Platform Options
const platforms = [

  {
    value: "all",
    label: "All Platforms",
  },

  {
    value: "codeforces",
    label: "Codeforces",
  },

  {
    value: "leetcode",
    label: "LeetCode",
  },

  {
    value: "codechef",
    label: "CodeChef",
  },

];

// Status Options
const statuses = [

  {
    value: "all",
    label: "All",
  },

  {
    value: "upcoming",
    label: "Upcoming",
  },

  {
    value: "live",
    label: "Live",
  },

  {
    value: "past",
    label: "Past",
  },

];

const ContestFilter = () => {

  const {

    filters = {},

    updateFilter,

  } = useContests();

  return (

    <div
      className="
        flex flex-col gap-3
        sm:flex-row
      "
    >

      {/* Platform Filters */}
      <div
        className="
          flex flex-wrap gap-2
        "
      >

        {platforms.map((platform) => (

          <button
            key={platform.value}

            type="button"

            onClick={() =>

              updateFilter(
                "platform",
                platform.value
              )

            }

            className={`
              rounded-lg
              border
              px-3 py-1.5
              text-sm font-medium
              transition-all duration-150

              ${
                filters.platform ===
                platform.value

                  ? `
                    border-primary-500
                    bg-primary-500
                    text-white
                  `

                  : `
                    border-gray-200
                    dark:border-gray-700

                    bg-white
                    dark:bg-dark-100

                    text-gray-600
                    dark:text-gray-400

                    hover:border-primary-400
                  `
              }
            `}
          >

            {platform.label}

          </button>

        ))}

      </div>

      {/* Divider */}
      <div
        className="
          hidden
          w-px

          bg-gray-200
          dark:bg-gray-700

          sm:block
        "
      />

      {/* Status Filters */}
      <div
        className="
          flex gap-2
        "
      >

        {statuses.map((status) => (

          <button
            key={status.value}

            type="button"

            onClick={() =>

              updateFilter(
                "status",
                status.value
              )

            }

            className={`
              rounded-lg
              border
              px-3 py-1.5
              text-sm font-medium
              transition-all duration-150

              ${
                filters.status ===
                status.value

                  ? `
                    border-primary-500
                    bg-primary-500
                    text-white
                  `

                  : `
                    border-gray-200
                    dark:border-gray-700

                    bg-white
                    dark:bg-dark-100

                    text-gray-600
                    dark:text-gray-400

                    hover:border-primary-400
                  `
              }
            `}
          >

            {status.label}

          </button>

        ))}

      </div>

    </div>

  );
};

export default ContestFilter;