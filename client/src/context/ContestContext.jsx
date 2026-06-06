// client/src/context/ContestContext.jsx

import {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";

import API from "../api/axios";

export const ContestContext = createContext(null);

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    platform: "all",
    status: "all",
    search: "",
  });

  const fetchContests = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await API.get("/contests");

      console.log("API Response:", response.data);

      const contestData =
        response?.data?.data?.contests || [];

      console.log(
        "Fetched Contests:",
        contestData.length
      );

      setContests(contestData);

    } catch (err) {
      console.error(
        "Contest fetch error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch contests"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const filteredContests = useMemo(() => {
    return contests.filter((contest) => {

      const platformMatch =
        filters.platform === "all" ||
        contest.platform?.toLowerCase() ===
          filters.platform?.toLowerCase();

      const statusMatch =
        filters.status === "all" ||
        contest.status === filters.status;

      const searchMatch =
        !filters.search.trim() ||
        contest.name
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          );

      return (
        platformMatch &&
        statusMatch &&
        searchMatch
      );
    });
  }, [contests, filters]);

  const updateFilter = (
    key,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      platform: "all",
      status: "all",
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

export const useContests = () => {
  const context =
    useContext(ContestContext);

  if (!context) {
    throw new Error(
      "useContests must be used inside ContestProvider"
    );
  }

  return context;
};