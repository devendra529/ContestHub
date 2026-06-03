// client/src/hooks/useCountdown.js

import {
  useEffect,
  useState,
} from "react";

// Countdown Hook
const useCountdown = (targetDate) => {

  // Calculate remaining time
  const calculateTime = () => {

    const now =
      new Date().getTime();

    const target =
      new Date(targetDate).getTime();

    const difference =
      target - now;

    // Countdown ended
    if (difference <= 0) {

      return {

        days: 0,

        hours: 0,

        minutes: 0,

        seconds: 0,

      };
    }

    return {

      days: Math.floor(

        difference /

        (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(

        (
          difference %

          (1000 * 60 * 60 * 24)
        ) /

        (1000 * 60 * 60)
      ),

      minutes: Math.floor(

        (
          difference %

          (1000 * 60 * 60)
        ) /

        (1000 * 60)
      ),

      seconds: Math.floor(

        (
          difference %

          (1000 * 60)
        ) / 1000
      ),

    };
  };

  // Initial State
  const [timeLeft, setTimeLeft] =
    useState(calculateTime);

  // Update every second
  useEffect(() => {

    const interval = setInterval(() => {

      setTimeLeft(
        calculateTime()
      );

    }, 1000);

    // Cleanup
    return () => {

      clearInterval(interval);

    };

  }, [targetDate]);

  // Live Status
  const now =
    new Date().getTime();

  const target =
    new Date(targetDate).getTime();

  const isLive =
    now >= target;

  return {

    ...timeLeft,

    isLive,

  };
};

export default useCountdown;

