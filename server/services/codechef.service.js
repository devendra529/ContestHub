// server/services/codechef.service.js

const axios = require("axios");

const KONTESTS_CC = "https://kontests.net/api/v1/code_chef";

const fetchCodechefContests = async () => {
  try {
    const response = await axios.get(KONTESTS_CC, { timeout: 10000 });

    const contests = response.data;

    if (!Array.isArray(contests)) {
      throw new Error("Unexpected response from Kontests CodeChef API");
    }

    return contests.map((c) => {
      const startTime = new Date(c.start_time);
      const endTime   = new Date(c.end_time);
      const now       = new Date();

      const duration  = Math.floor((endTime - startTime) / 1000);

      let status;
      if (now < startTime)    status = "upcoming";
      else if (now < endTime) status = "live";
      else                    status = "past";

      return {
        externalId : c.name.replace(/\s+/g, "-").toLowerCase(),
        platform   : "codechef",
        name       : c.name,
        startTime,
        endTime,
        duration,
        url        : c.url,
        status,
      };
    });

  } catch (error) {
    console.error("CodeChef fetch failed:", error.message);
    return [];
  }
};

module.exports = fetchCodechefContests;