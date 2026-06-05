// client/src/components/contest/ContestList.jsx

import ContestCard from "./ContestCard";

import SkeletonGrid from "../ui/Skeleton";

import useBookmarks from "../../hooks/useBookmarks";

const ContestList = ({
  contests = [],
  isLoading = false,
}) => {

  const {
    isBookmarked,
    toggleBookmark,
  } = useBookmarks();

  // Loading State
  if (isLoading) {

    return (
      <SkeletonGrid count={6} />
    );
  }

  // Empty State
  if (
    !Array.isArray(contests) ||
    contests.length === 0
  ) {

    return (

      <div
        className="
          flex flex-col items-center
          justify-center

          py-20

          text-center
        "
      >

        <span
          className="
            mb-4 text-6xl
          "
        >

          🔍

        </span>

        <h3
          className="
            mb-2

            text-lg font-semibold

            text-gray-700
            dark:text-gray-300
          "
        >

          No contests found

        </h3>

        <p
          className="
            max-w-xs

            text-sm

            text-gray-400
            dark:text-gray-500
          "
        >

          Try adjusting your
          filters or search query
          to find more contests.

        </p>

      </div>

    );
  }

  // Contest Grid
  return (

    <div
      className="
        grid gap-5

        grid-cols-1

        md:grid-cols-2

        xl:grid-cols-3
      "
    >

      {contests.map((contest) => {

        const contestId =

          contest?.externalId ||

          contest?._id ||

          `${contest?.platform}-${contest?.name}`;

        return (

          <ContestCard
            key={`${contest.platform}-${contestId}`}

            contest={contest}

            isBookmarked={

              isBookmarked(
                contestId,
                contest?.platform
              )

            }

            onBookmarkToggle={
              toggleBookmark
            }
          />

        );
      })}

    </div>

  );
};

export default ContestList;

