// client/src/components/contest/CountdownTimer.jsx

import useCountdown
  from "../../hooks/useCountdown";

// Time Unit
const TimeUnit = ({
  value,
  label,
}) => (

  <div
    className="
      flex flex-col items-center
    "
  >

    <span
      className="
        min-w-[2ch]

        text-center

        text-lg font-bold

        leading-none

        tabular-nums

        text-gray-900
        dark:text-white
      "
    >

      {String(value).padStart(2, "0")}

    </span>

    <span
      className="
        mt-0.5

        text-xxs uppercase
        tracking-wider

        text-gray-400
        dark:text-gray-500
      "
    >

      {label}

    </span>

  </div>

);

// Separator
const Separator = () => (

  <span
    className="
      mb-3

      select-none

      text-sm font-bold

      text-gray-300
      dark:text-gray-600
    "
  >

    :

  </span>

);

const CountdownTimer = ({
  startTime,
  endTime,
  status,
}) => {

  // Safe Target Time
  const targetTime =

    status === "live"
      ? endTime
      : startTime;

  // Countdown Hook
  const {

    days = 0,

    hours = 0,

    minutes = 0,

    seconds = 0,

    isLive = false,

  } = useCountdown(targetTime);

  // Past Contest
  if (status === "past") {

    return (

      <div
        className="
          flex items-center justify-center

          rounded-xl

          bg-gray-100
          dark:bg-gray-800/50

          px-4 py-3
        "
      >

        <span
          className="
            text-sm

            text-gray-400
            dark:text-gray-500
          "
        >

          Contest ended

        </span>

      </div>

    );
  }

  // Live Contest
  if (
    status === "live" ||
    isLive
  ) {

    return (

      <div
        className="
          flex items-center justify-center gap-1

          rounded-xl

          border border-green-500/20

          bg-green-500/10

          px-4 py-3
        "
      >

        {/* Live Dot */}
        <span
          className="
            mr-2

            h-2 w-2

            animate-pulse

            rounded-full

            bg-green-400
          "
        />

        {/* Live Text */}
        <span
          className="
            text-sm font-semibold

            text-green-400
          "
        >

          LIVE NOW

        </span>

        {/* Remaining Time */}
        {endTime && (

          <span
            className="
              ml-2

              text-xs

              text-green-500/70
            "
          >

            ends in
            {" "}

            {String(hours).padStart(2, "0")}
            :

            {String(minutes).padStart(2, "0")}
            :

            {String(seconds).padStart(2, "0")}

          </span>

        )}

      </div>

    );
  }

  // Upcoming Contest
  return (

    <div
      className="
        flex items-center justify-center gap-2

        rounded-xl

        border border-primary-500/10

        bg-primary-500/5

        px-4 py-3
      "
    >

      {/* Days */}
      {days > 0 && (

        <>

          <TimeUnit
            value={days}
            label="days"
          />

          <Separator />

        </>

      )}

      {/* Hours */}
      <TimeUnit
        value={hours}
        label="hrs"
      />

      <Separator />

      {/* Minutes */}
      <TimeUnit
        value={minutes}
        label="min"
      />

      <Separator />

      {/* Seconds */}
      <TimeUnit
        value={seconds}
        label="sec"
      />

    </div>

  );
};

export default CountdownTimer;

