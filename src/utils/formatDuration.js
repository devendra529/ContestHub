// client/src/utils/formatDuration.js

// contest duration comes in as seconds from backend
// we need to display it as "2h 30m" on the contest card

export const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) return "N/A";

  const hours   = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0)   return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
};

