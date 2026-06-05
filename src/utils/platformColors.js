// client/src/utils/platformColors.js

// every platform gets its own color identity
// used in badges, cards, and filter buttons

export const platformConfig = {
  codeforces: {
    label     : "Codeforces",
    color     : "bg-blue-500",
    textColor : "text-blue-500",
    lightBg   : "bg-blue-500/10",
    border    : "border-blue-500/30",
    hex       : "#3b82f6",
  },
  leetcode: {
    label     : "LeetCode",
    color     : "bg-yellow-500",
    textColor : "text-yellow-500",
    lightBg   : "bg-yellow-500/10",
    border    : "border-yellow-500/30",
    hex       : "#eab308",
  },
  codechef: {
    label     : "CodeChef",
    color     : "bg-orange-500",
    textColor : "text-orange-500",
    lightBg   : "bg-orange-500/10",
    border    : "border-orange-500/30",
    hex       : "#f97316",
  },
};

// returns the config for a platform
// falls back to a neutral config if platform is unknown
export const getPlatformConfig = (platform) => {
  return platformConfig[platform?.toLowerCase()] || {
    label    : platform || "Unknown",
    color    : "bg-gray-500",
    textColor: "text-gray-500",
    lightBg  : "bg-gray-500/10",
    border   : "border-gray-500/30",
    hex      : "#6b7280",
  };
};

// status badge colors
export const statusConfig = {
  upcoming: {
    label  : "Upcoming",
    color  : "bg-primary-500/10 text-primary-400 border border-primary-500/30",
  },
  live: {
    label  : "Live Now",
    color  : "bg-green-500/10 text-green-400 border border-green-500/30",
  },
  past: {
    label  : "Ended",
    color  : "bg-gray-500/10 text-gray-400 border border-gray-500/30",
  },
};

export const getStatusConfig = (status) => {
  return statusConfig[status] || statusConfig.upcoming;
};

