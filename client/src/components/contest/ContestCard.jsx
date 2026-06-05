// client/src/components/contest/ContestCard.jsx

import {
  PlatformBadge,
  StatusBadge,
} from "../ui/Badge";

import CountdownTimer
  from "./CountdownTimer";

import {
  formatDate,
} from "../../utils/formatDate";

import {
  formatDuration,
} from "../../utils/formatDuration";

const ContestCard = ({
  contest,
  isBookmarked,
  onBookmarkToggle,
}) => {

  // Safe Values
  const contestName =

    contest?.name ||
    "Untitled Contest";

  const contestUrl =

    contest?.url || "#";

  const platform =

    contest?.platform || "";

  const status =

    contest?.status || "";

  const startTime =

    contest?.startTime || "";

  const endTime =

    contest?.endTime || "";

  const duration =

    contest?.duration || 0;

  return (

    <div
      className="
        group

        flex flex-col gap-4

        rounded-2xl

        border border-gray-200
        dark:border-gray-700/50

        bg-white
        dark:bg-dark-100

        p-5

        transition-all duration-200

        hover:border-primary-500/40
        hover:shadow-lg
        hover:shadow-primary-500/10

        animate-fade-in
      "
    >

      {/* Top Row */}
      <div
        className="
          flex items-start justify-between gap-3
        "
      >

        {/* Badges */}
        <div
          className="
            flex flex-wrap items-center gap-2
          "
        >

          <PlatformBadge
            platform={platform}
          />

          <StatusBadge
            status={status}
          />

        </div>

        {/* Bookmark */}
        <button
          onClick={() =>
            onBookmarkToggle(contest)
          }

          title={
            isBookmarked

              ? "Remove bookmark"

              : "Bookmark contest"
          }

          className={`
            flex-shrink-0

            rounded-lg

            p-2

            transition-all duration-200

            ${
              isBookmarked

                ? `
                  bg-primary-500/10
                  text-primary-500
                `

                : `
                  text-gray-400
                  dark:text-gray-500

                  hover:text-primary-500
                `
            }
          `}
        >

          <svg
            className="h-5 w-5"

            fill={
              isBookmarked
                ? "currentColor"
                : "none"
            }

            stroke="currentColor"

            viewBox="0 0 24 24"
          >

            <path
              strokeLinecap="round"

              strokeLinejoin="round"

              strokeWidth={2}

              d="
                M5 5a2 2 0 012-2h10
                a2 2 0 012 2v16l-7-3.5L5 21V5z
              "
            />

          </svg>

        </button>

      </div>

      {/* Contest Title */}
      <h3
        className="
          line-clamp-2

          text-base font-semibold

          leading-snug

          text-gray-900
          dark:text-white

          transition-colors

          group-hover:text-primary-500
        "
      >

        {contestName}

      </h3>

      {/* Countdown */}
      <CountdownTimer
        startTime={startTime}
        endTime={endTime}
        status={status}
      />

      {/* Bottom Row */}
      <div
        className="
          flex items-center justify-between

          gap-4

          text-xs

          text-gray-600
          dark:text-gray-400
        "
      >

        {/* Left Info */}
        <div
          className="
            flex flex-col gap-1.5
          "
        >

          {/* Start Date */}
          <span
            className="
              flex items-center gap-1.5
            "
          >

            📅

            {formatDate(startTime)}

          </span>

          {/* Duration */}
          <span
            className="
              flex items-center gap-1.5
            "
          >

            ⏱️

            Duration:
            {" "}

            {formatDuration(duration)}

          </span>

        </div>

        {/* Visit Button */}
        <a
          href={contestUrl}

          target="_blank"

          rel="noreferrer"

          onClick={(e) =>
            e.stopPropagation()
          }

          className="
            flex items-center gap-1

            rounded-lg

            border border-primary-500/20

            bg-primary-500/10

            px-3 py-1.5

            font-medium

            text-primary-500

            transition-all duration-200

            hover:bg-primary-500
            hover:text-white
          "
        >

          Visit

          <svg
            className="h-3 w-3"

            fill="none"

            stroke="currentColor"

            viewBox="0 0 24 24"
          >

            <path
              strokeLinecap="round"

              strokeLinejoin="round"

              strokeWidth={2}

              d="
                M10 6H6a2 2 0 00-2 2v10
                a2 2 0 002 2h10a2 2 0 002-2v-4

                M14 4h6m0 0v6m0-6L10 14
              "
            />

          </svg>

        </a>

      </div>

    </div>

  );
};

export default ContestCard;

