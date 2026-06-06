const axios = require("axios");

const fetchCodeforcesContests = async () => {
  try {
    console.log("Fetching Codeforces contests...");

    const { data } = await axios.get(
      "https://codeforces.com/api/contest.list",
      {
        timeout: 15000,
      }
    );

    if (data.status !== "OK") {
      console.error("Codeforces API Error");
      return [];
    }

    const now = new Date();

    const contests = data.result.map((contest) => {
      const startTime = new Date(
        contest.startTimeSeconds * 1000
      );

      const endTime = new Date(
        (contest.startTimeSeconds +
          contest.durationSeconds) *
          1000
      );

      let status = "upcoming";

      if (now >= startTime && now <= endTime) {
        status = "live";
      } else if (now > endTime) {
        status = "past";
      }

      return {
        externalId: String(contest.id),
        platform: "codeforces",
        name: contest.name,
        startTime,
        endTime,
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
        status,
      };
    });

    console.log(
      `Codeforces contests fetched: ${contests.length}`
    );

    return contests;
  } catch (error) {
    console.error(
      "Codeforces fetch failed:",
      error.message
    );
    return [];
  }
};

module.exports = fetchCodeforcesContests;