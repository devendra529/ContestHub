const axios = require("axios");

const fetchLeetcodeContests = async () => {
  try {
    console.log("Fetching LeetCode contests...");

    const response = await axios.get(
      "https://lccn.lbao.site/api/v1/contest/upcoming",
      {
        timeout: 15000,
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    const data = response?.data?.data || [];

    if (!Array.isArray(data)) {
      console.error("Invalid LeetCode response");
      return [];
    }

    const now = new Date();

    const contests = data.map((contest) => {
      const startTime = new Date(
        contest.startTime * 1000
      );

      const endTime = new Date(
        (contest.startTime + contest.duration) *
          1000
      );

      let status = "upcoming";

      if (
        now >= startTime &&
        now <= endTime
      ) {
        status = "live";
      } else if (now > endTime) {
        status = "past";
      }

      return {
        externalId:
          contest.titleSlug ||
          String(contest.title),

        platform: "leetcode",

        name: contest.title,

        startTime,

        endTime,

        duration: contest.duration,

        url: `https://leetcode.com/contest/${contest.titleSlug}`,

        status,
      };
    });

    console.log(
      `LeetCode contests fetched: ${contests.length}`
    );

    return contests;
  } catch (error) {
    console.error(
      "LeetCode fetch failed:",
      error.message
    );

    if (error.response) {
      console.error(
        "Status:",
        error.response.status
      );
    }

    return [];
  }
};

module.exports = fetchLeetcodeContests;