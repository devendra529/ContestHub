import {
  useContext,
} from "react";

import {
  ContestContext,
} from "../context/ContestContext";

const useContests = () => {

  const context =
    useContext(
      ContestContext
    );

  if (!context) {

    throw new Error(
      "useContests must be used inside ContestProvider"
    );
  }

  return context;
};

export default useContests;
