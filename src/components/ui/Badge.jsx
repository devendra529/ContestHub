// client/src/components/ui/Badge.jsx

import { getPlatformConfig, getStatusConfig } from "../../utils/platformColors";

// two types of badges — platform and status
// platform: "Codeforces" in blue, "LeetCode" in yellow, etc.
// status:   "Upcoming" in purple, "Live" in green, "Ended" in gray

export const PlatformBadge = ({ platform }) => {
  const config = getPlatformConfig(platform);

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1
      rounded-full text-xs font-semibold
      ${config.lightBg} ${config.textColor} ${config.border} border
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
      {config.label}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const config = getStatusConfig(status);

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1
      rounded-full text-xs font-semibold
      ${config.color}
    `}>
      {status === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      )}
      {config.label}
    </span>
  );
};

