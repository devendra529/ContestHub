// client/src/utils/formatDate.js

// formats a date into something human readable
// we use this on contest cards to show start time

export const formatDate = (dateString) => {
  if (!dateString) return "TBD";

  const date = new Date(dateString);

  // check if the date is valid
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-IN", {
    day     : "numeric",
    month   : "short",
    year    : "numeric",
    hour    : "2-digit",
    minute  : "2-digit",
    hour12  : true,
    timeZone: "Asia/Kolkata", // IST — change to your timezone
  });
};

// just the time part — "02:30 PM"
export const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleTimeString("en-IN", {
    hour    : "2-digit",
    minute  : "2-digit",
    hour12  : true,
    timeZone: "Asia/Kolkata",
  });
};

// relative time — "in 2 hours", "3 days ago"
export const formatRelativeTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now  = new Date();
  const diff = date - now; // milliseconds

  const abs     = Math.abs(diff);
  const minutes = Math.floor(abs / (1000 * 60));
  const hours   = Math.floor(abs / (1000 * 60 * 60));
  const days    = Math.floor(abs / (1000 * 60 * 60 * 24));

  const future  = diff > 0;

  if (minutes < 1)  return "just now";
  if (minutes < 60) return future ? `in ${minutes}m` : `${minutes}m ago`;
  if (hours < 24)   return future ? `in ${hours}h`   : `${hours}h ago`;
  return future ? `in ${days}d` : `${days}d ago`;
};

