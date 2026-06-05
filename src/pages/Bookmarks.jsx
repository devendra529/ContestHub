// client/src/pages/Bookmarks.jsx

import { useState } from "react";

import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";

import NoteModal from "../components/notes/NoteModal";

import SkeletonGrid from "../components/ui/Skeleton";

import { PlatformBadge } from "../components/ui/Badge";

import useBookmarks from "../hooks/useBookmarks";

import { formatDate } from "../utils/formatDate";

const Bookmarks = () => {

  const {
    bookmarks,
    isLoading,
    toggleBookmark,
  } = useBookmarks();

  // Note Modal State
  const [noteModal, setNoteModal] =
    useState({

      open: false,

      contest: null,

    });

  // Remove Bookmark
  const handleRemoveBookmark =
    async (bookmark) => {

      await toggleBookmark({

        externalId:
          bookmark.contestId,

        platform:
          bookmark.platform,

        name:
          bookmark.contestName,

        startTime:
          bookmark.startTime,

        url:
          bookmark.url,

      });
    };

  // Open Note Modal
  const handleOpenNoteModal =
    (bookmark) => {

      setNoteModal({

        open: true,

        contest: bookmark,

      });
    };

  // Close Modal
  const handleCloseModal = () => {

    setNoteModal({

      open: false,

      contest: null,

    });
  };

  // Loading State
  if (isLoading) {

    return (

      <Layout>

        <div
          className="
            min-h-screen

            bg-gray-50 dark:bg-dark-200

            px-4 py-6
          "
        >

          <div className="max-w-7xl mx-auto">

            <div
              className="
                h-8 w-40

                rounded-lg

                mb-8

                bg-gray-200 dark:bg-gray-700

                animate-pulse
              "
            />

            <SkeletonGrid count={6} />

          </div>

        </div>

      </Layout>
    );
  }

  return (

    <Layout>

      {/* Main Background */}
      <div
        className="
          min-h-screen

          bg-gray-50 dark:bg-dark-200

          px-4 py-6
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">

            <h1
              className="
                text-2xl font-bold

                text-gray-900 dark:text-white
              "
            >

              Bookmarks

            </h1>

            <p
              className="
                mt-1

                text-sm

                text-gray-500 dark:text-gray-400
              "
            >

              {bookmarks.length}
              {" "}
              saved contest
              {bookmarks.length !== 1
                ? "s"
                : ""}

            </p>

          </div>

          {/* Empty State */}
          {bookmarks.length === 0 && (

            <div
              className="
                flex flex-col
                items-center
                justify-center

                py-24

                text-center
              "
            >

              <span className="text-6xl mb-4">
                🔖
              </span>

              <h3
                className="
                  mb-2

                  text-lg font-semibold

                  text-gray-700 dark:text-gray-300
                "
              >

                No bookmarks yet

              </h3>

              <p
                className="
                  max-w-xs

                  text-sm

                  text-gray-400 dark:text-gray-500
                "
              >

                Go to the dashboard and
                bookmark contests you want
                to participate in.

              </p>

            </div>

          )}

          {/* Bookmarks Grid */}
          {bookmarks.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3

                gap-5
              "
            >

              {bookmarks.map((bookmark) => (

                <div
                  key={bookmark._id}
                  className="
                    flex flex-col gap-4

                    rounded-2xl

                    p-5

                    bg-white dark:bg-dark-100

                    border border-gray-200
                    dark:border-gray-700/50

                    hover:border-primary-500/30

                    shadow-sm

                    transition-all

                    animate-fade-in
                  "
                >

                  {/* Top Row */}
                  <div
                    className="
                      flex items-center justify-between
                    "
                  >

                    <PlatformBadge
                      platform={
                        bookmark.platform
                      }
                    />

                    {/* Remove Bookmark */}
                    <button
                      onClick={() =>
                        handleRemoveBookmark(
                          bookmark
                        )
                      }
                      title="Remove bookmark"
                      className="
                        p-2

                        rounded-lg

                        text-primary-500

                        bg-primary-500/10

                        hover:bg-red-500/10
                        hover:text-red-400

                        transition-colors
                      "
                    >

                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >

                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />

                      </svg>

                    </button>

                  </div>

                  {/* Contest Name */}
                  <h3
                    className="
                      text-sm font-semibold

                      leading-snug

                      text-gray-900 dark:text-white

                      line-clamp-2
                    "
                  >

                    {bookmark.contestName}

                  </h3>

                  {/* Contest Date */}
                  {bookmark.startTime && (

                    <div
                      className="
                        flex items-center gap-1.5

                        text-xs

                        text-gray-500 dark:text-gray-400
                      "
                    >

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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />

                      </svg>

                      {formatDate(
                        bookmark.startTime
                      )}

                    </div>

                  )}

                  {/* Buttons */}
                  <div
                    className="
                      flex gap-2

                      mt-auto
                    "
                  >

                    {/* Add Note */}
                    <button
                      onClick={() =>
                        handleOpenNoteModal(
                          bookmark
                        )
                      }
                      className="
                        flex-1

                        flex items-center
                        justify-center
                        gap-1.5

                        px-3 py-2

                        rounded-xl

                        text-xs font-medium

                        border border-gray-200
                        dark:border-gray-700

                        text-gray-500
                        dark:text-gray-400

                        hover:border-primary-400
                        hover:text-primary-500

                        transition-all
                      "
                    >

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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />

                      </svg>

                      Add Note

                    </button>

                    {/* Visit Link */}
                    {bookmark.url && (

                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex-1

                          flex items-center
                          justify-center
                          gap-1.5

                          px-3 py-2

                          rounded-xl

                          text-xs font-medium

                          bg-primary-500/10

                          text-primary-500

                          border border-primary-500/20

                          hover:bg-primary-500
                          hover:text-white

                          transition-all
                        "
                      >

                        Visit

                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />

                        </svg>

                      </a>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* Note Modal */}
      <NoteModal
        isOpen={noteModal.open}
        onClose={handleCloseModal}
        contest={noteModal.contest}
        onSaved={() =>
          toast.success("Note saved!")
        }
      />

    </Layout>
  );
};

export default Bookmarks;

