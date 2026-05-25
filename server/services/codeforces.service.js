// server/services/codeforces.service.js

const axios = require("axios");

const CF_API = "https://codeforces.com/api/contest.list";

const fetchCodeforcesContests = async () => {
  try {
    const response = await axios.get(CF_API, { timeout: 10000 });

    // CF returns { status: "OK", result: [...contests] }
    if (response.data.status !== "OK") {
      throw new Error("Codeforces API returned non-OK status");
    }

    const contests = response.data.result;

    // CF gives us ALL contests ever — thousands of them.
    // We only care about upcoming, live, and recent past (last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const filtered = contests.filter((c) => {
      // CF stores startTimeSeconds as unix timestamp (seconds not ms)
      const startMs = c.startTimeSeconds * 1000;
      const endMs   = startMs + c.durationSeconds * 1000;

      // keep if: not finished yet OR finished within last 7 days
      return endMs > sevenDaysAgo;
    });

    // normalize to our unified schema
    return filtered.map((c) => {
      const startTime = new Date(c.startTimeSeconds * 1000);
      const endTime   = new Date((c.startTimeSeconds + c.durationSeconds) * 1000);
      const now       = new Date();

      let status;
      if (now < startTime)      status = "upcoming";
      else if (now < endTime)   status = "live";
      else                      status = "past";

      return {
        externalId : String(c.id),
        platform   : "codeforces",
        name       : c.name,
        startTime,
        endTime,
        duration   : c.durationSeconds,
        url        : `https://codeforces.com/contest/${c.id}`,
        status,
      };
    });

  } catch (error) {
    // don't crash the whole aggregator if one platform fails
    // just log it and return empty array
    console.error("Codeforces fetch failed:", error.message);
    return [];
  }
};

module.exports = fetchCodeforcesContests;