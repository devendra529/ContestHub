// client/src/pages/Profile.jsx

import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import Layout from "../components/layout/Layout";

import { useAuth } from "../context/AuthContext";

import { formatDate } from "../utils/formatDate";

import { getPlatformConfig } from "../utils/platformColors";

const Profile = () => {

  const { user } = useAuth();

  const [stats, setStats] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // Fetch User Stats
  useEffect(() => {

    let ignore = false;

    const fetchStats = async () => {

      try {

        const response =
          await API.get("/user/stats");

        if (!ignore) {

          setStats(
            response.data.data
          );
        }

      } catch (error) {

        console.error(
          "Failed to load stats:",
          error
        );

      } finally {

        if (!ignore) {

          setIsLoading(false);

        }
      }
    };

    fetchStats();

    return () => {

      ignore = true;

    };

  }, []);

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

        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-8">

            <h1
              className="
                text-2xl font-bold

                text-gray-900 dark:text-white
              "
            >

              Profile

            </h1>

            <p
              className="
                mt-1

                text-sm

                text-gray-500 dark:text-gray-400
              "
            >

              Your account details and activity

            </p>

          </div>

          <div className="flex flex-col gap-6">

            {/* User Card */}
            <div
              className="
                rounded-2xl

                p-6

                bg-white dark:bg-dark-100

                border border-gray-200 dark:border-gray-700/50

                shadow-sm
              "
            >

              <div className="flex items-center gap-4">

                {/* Avatar */}
                <div
                  className="
                    flex items-center justify-center

                    w-16 h-16

                    rounded-2xl

                    bg-gradient-to-br
                    from-primary-400
                    to-primary-600

                    text-white
                    text-2xl font-bold

                    flex-shrink-0
                  "
                >

                  {user?.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">

                  <h2
                    className="
                      text-xl font-bold

                      text-gray-900 dark:text-white

                      truncate
                    "
                  >

                    {user?.name}

                  </h2>

                  <p
                    className="
                      mt-1

                      text-sm

                      text-gray-500 dark:text-gray-400

                      truncate
                    "
                  >

                    {user?.email}

                  </p>

                  <p
                    className="
                      mt-2

                      text-xs

                      text-gray-400 dark:text-gray-500
                    "
                  >

                    Member since{" "}

                    {formatDate(
                      user?.createdAt
                    )}

                  </p>

                </div>

              </div>

            </div>

            {/* Activity Stats */}
            <div
              className="
                rounded-2xl

                p-6

                bg-white dark:bg-dark-100

                border border-gray-200 dark:border-gray-700/50

                shadow-sm
              "
            >

              <h3
                className="
                  mb-5

                  text-lg font-semibold

                  text-gray-900 dark:text-white
                "
              >

                Your Activity

              </h3>

              {/* Loading Skeleton */}
              {isLoading ? (

                <div
                  className="
                    grid grid-cols-1 sm:grid-cols-2

                    gap-4
                  "
                >

                  {[1, 2].map((item) => (

                    <div
                      key={item}
                      className="
                        h-24

                        rounded-2xl

                        bg-gray-100 dark:bg-gray-800

                        animate-pulse
                      "
                    />

                  ))}

                </div>

              ) : (

                <div
                  className="
                    grid grid-cols-1 sm:grid-cols-2

                    gap-4
                  "
                >

                  {/* Bookmarks */}
                  <div
                    className="
                      rounded-2xl

                      p-5

                      text-center

                      bg-primary-500/10

                      border border-primary-500/20
                    "
                  >

                    <p
                      className="
                        text-4xl font-bold

                        text-primary-500
                      "
                    >

                      {stats?.totalBookmarks ?? 0}

                    </p>

                    <p
                      className="
                        mt-2

                        text-sm font-medium

                        text-gray-600 dark:text-gray-400
                      "
                    >

                      Total Bookmarks

                    </p>

                  </div>

                  {/* Notes */}
                  <div
                    className="
                      rounded-2xl

                      p-5

                      text-center

                      bg-green-500/10

                      border border-green-500/20
                    "
                  >

                    <p
                      className="
                        text-4xl font-bold

                        text-green-500
                      "
                    >

                      {stats?.totalNotes ?? 0}

                    </p>

                    <p
                      className="
                        mt-2

                        text-sm font-medium

                        text-gray-600 dark:text-gray-400
                      "
                    >

                      Total Notes

                    </p>

                  </div>

                </div>

              )}

              {/* Platform Stats */}
              {stats?.bookmarksByPlatform
                ?.length > 0 && (

                <div className="mt-8">

                  <h4
                    className="
                      mb-4

                      text-sm font-semibold

                      text-gray-700 dark:text-gray-300
                    "
                  >

                    Bookmarks by Platform

                  </h4>

                  <div className="flex flex-col gap-4">

                    {stats.bookmarksByPlatform.map(
                      (item) => {

                        const config =
                          getPlatformConfig(
                            item._id
                          );

                        const total =
                          stats.totalBookmarks || 1;

                        const percent =
                          Math.round(

                            (item.count / total) * 100
                          );

                        return (

                          <div key={item._id}>

                            {/* Labels */}
                            <div
                              className="
                                mb-1

                                flex items-center justify-between

                                text-xs
                              "
                            >

                              <span
                                className={`
                                  font-medium

                                  ${config.textColor}
                                `}
                              >

                                {config.label}

                              </span>

                              <span
                                className="
                                  text-gray-400 dark:text-gray-500
                                "
                              >

                                {item.count}
                                {" "}
                                ({percent}%)

                              </span>

                            </div>

                            {/* Progress Bar */}
                            <div
                              className="
                                h-2

                                overflow-hidden

                                rounded-full

                                bg-gray-100 dark:bg-gray-800
                              "
                            >

                              <div
                                className={`
                                  h-full

                                  rounded-full

                                  ${config.color}

                                  transition-all duration-700
                                `}
                                style={{
                                  width:
                                    `${percent}%`,
                                }}
                              />

                            </div>

                          </div>

                        );
                      }
                    )}

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
};

export default Profile;

