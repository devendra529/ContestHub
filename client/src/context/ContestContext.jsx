// client/src/context/ContestContext.jsx

import {
  createContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import API from "../api/axios";

// Context
export const ContestContext =
  createContext(null);

// Provider
export const ContestProvider = ({
  children,
}) => {

  // States
  const [contests, setContests] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // Filters
  const [filters, setFilters] =
    useState({

      platform: "all",

      status: "upcoming",

      search: "",

    });

  // Fetch Contests
  const fetchContests =
    async () => {

      try {

        setIsLoading(true);

        setError(null);

        const response =
          await API.get(
            "/contests"
          );

        setContests(

          response.data.data
            ?.contests || []

        );

      } catch (err) {

        console.error(
          "Contest fetch error:",
          err
        );

        setError(

          err.response?.data
            ?.message ||

          "Failed to fetch contests"

        );

      } finally {

        setIsLoading(false);

      }
    };

  // Fetch On Mount
  useEffect(() => {

    fetchContests();

  }, []);

  // Filtered Contests
  const filteredContests =
    useMemo(() => {

      return contests.filter(
        (contest) => {

          const platformMatch =

            filters.platform ===
              "all" ||

            contest.platform ===
              filters.platform;

          const statusMatch =

            filters.status ===
              "all" ||

            contest.status ===
              filters.status;

          const searchMatch =

            contest.name
              ?.toLowerCase()
              .includes(

                filters.search
                  .toLowerCase()

              );

          return (

            platformMatch &&
            statusMatch &&
            searchMatch

          );
        }
      );

    }, [contests, filters]);

  // Update Filter
  const updateFilter = (
    key,
    value
  ) => {

    setFilters((prev) => ({

      ...prev,

      [key]: value,

    }));
  };

  // Clear Filters
  const clearFilters = () => {

    setFilters({

      platform: "all",

      status: "upcoming",

      search: "",

    });
  };

  return (

    <ContestContext.Provider
      value={{

        contests,

        filteredContests,

        isLoading,

        error,

        filters,

        updateFilter,

        clearFilters,

        fetchContests,

      }}
    >

      {children}

    </ContestContext.Provider>

  );
};
