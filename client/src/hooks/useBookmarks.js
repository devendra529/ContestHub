// client/src/hooks/useBookmarks.js

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const useBookmarks = () => {

  const { isAuthenticated } = useAuth();

  const [bookmarks, setBookmarks] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  // Fetch bookmarks
  const fetchBookmarks = async () => {

    // User not logged in
    if (!isAuthenticated) {

      setBookmarks([]);

      return;
    }

    setIsLoading(true);

    try {

      const response =
        await API.get("/bookmarks");

      setBookmarks(
        response.data.data.bookmarks || []
      );

    } catch (error) {

      console.error(
        "Fetch bookmarks error:",
        error
      );

    } finally {

      setIsLoading(false);

    }
  };

  // Load bookmarks
  useEffect(() => {

    let ignore = false;

    const loadBookmarks = async () => {

      if (!isAuthenticated) {

        if (!ignore) {

          setBookmarks([]);

        }

        return;
      }

      if (!ignore) {

        setIsLoading(true);

      }

      try {

        const response =
          await API.get("/bookmarks");

        if (!ignore) {

          setBookmarks(
            response.data.data.bookmarks || []
          );

        }

      } catch (error) {

        console.error(
          "Fetch bookmarks error:",
          error
        );

      } finally {

        if (!ignore) {

          setIsLoading(false);

        }
      }
    };

    loadBookmarks();

    return () => {

      ignore = true;

    };

  }, [isAuthenticated]);

  // Check bookmark
  const isBookmarked = (
    contestId,
    platform
  ) => {

    return bookmarks.some(

      (bookmark) =>

        bookmark.contestId === contestId &&
        bookmark.platform === platform
    );
  };

  // Get bookmark object
  const getBookmark = (
    contestId,
    platform
  ) => {

    return bookmarks.find(

      (bookmark) =>

        bookmark.contestId === contestId &&
        bookmark.platform === platform
    );
  };

  // Toggle bookmark
  const toggleBookmark = async (
    contest
  ) => {

    // Not logged in
    if (!isAuthenticated) {

      toast.error(
        "Please login to bookmark contests"
      );

      return;
    }

    const contestId =
      contest?.externalId ||
      contest?.contestId;

    const platform =
      contest?.platform;

    const alreadyBookmarked =
      isBookmarked(
        contestId,
        platform
      );

    // Remove bookmark
    if (alreadyBookmarked) {

      const bookmark =
        getBookmark(
          contestId,
          platform
        );

      if (!bookmark) return;

      try {

        await API.delete(
          `/bookmarks/${bookmark._id}`
        );

        setBookmarks((prev) =>

          prev.filter(

            (item) =>
              item._id !== bookmark._id
          )
        );

        toast.success(
          "Bookmark removed"
        );

      } catch (error) {

        console.error(
          "Remove bookmark error:",
          error
        );

        toast.error(
          "Failed to remove bookmark"
        );
      }

    } else {

      // Add bookmark
      try {

        const response =
          await API.post(
            "/bookmarks",
            {

              contestId,

              platform,

              contestName:
                contest?.name ||
                contest?.contestName,

              startTime:
                contest?.startTime,

              url:
                contest?.url,

            }
          );

        const newBookmark =
          response.data.data.bookmark;

        setBookmarks((prev) => [

          ...prev,

          newBookmark,

        ]);

        toast.success(
          "Contest bookmarked 🔖"
        );

      } catch (error) {

        console.error(
          "Add bookmark error:",
          error
        );

        toast.error(

          error.response?.data?.message ||

          "Failed to bookmark contest"
        );
      }
    }
  };

  return {

    bookmarks,

    isLoading,

    isBookmarked,

    toggleBookmark,

    fetchBookmarks,

  };
};

export default useBookmarks;

