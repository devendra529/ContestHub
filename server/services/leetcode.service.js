// server/services/leetcode.service.js

const axios = require("axios");

const KONTESTS_LC = "https://kontests.net/api/v1/leet_code";

const fetchLeetcodeContests = async () => {
  try {
    const response = await axios.get(KONTESTS_LC, { timeout: 10000 });

    const contests = response.data;

    if (!Array.isArray(contests)) {
      throw new Error("Unexpected response from Kontests LeetCode API");
    }

    return contests.map((c) => {
      const startTime = new Date(c.start_time);
      const endTime   = new Date(c.end_time);
      const now       = new Date();

      // duration in seconds
      const duration  = Math.floor((endTime - startTime) / 1000);

      let status;
      if (now < startTime)    status = "upcoming";
      else if (now < endTime) status = "live";
      else                    status = "past";

      return {
        externalId : c.name.replace(/\s+/g, "-").toLowerCase(),
        platform   : "leetcode",
        name       : c.name,
        startTime,
        endTime,
        duration,
        url        : c.url,
        status,
      };
    });

  } catch (error) {
    console.error("LeetCode fetch failed:", error.message);
    return [];
  }
};

module.exports = fetchLeetcodeContests;