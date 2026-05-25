// server/services/contest.aggregator.js

const Contest                = require("../models/Contest.model");
const fetchCodeforcesContests = require("./codeforces.service");
const fetchLeetcodeContests   = require("./leetcode.service");
const fetchCodechefContests   = require("./codechef.service");

const aggregateContests = async () => {
  console.log("Fetching contests from all platforms...");

  // Promise.allSettled runs all three in parallel
  // and doesn't fail if one of them throws —
  // it returns { status: "fulfilled"/"rejected", value/reason }
  const results = await Promise.allSettled([
    fetchCodeforcesContests(),
    fetchLeetcodeContests(),
    fetchCodechefContests(),
  ]);

  // collect successful results
  let allContests = [];

  results.forEach((result, index) => {
    const platforms = ["Codeforces", "LeetCode", "CodeChef"];
    if (result.status === "fulfilled") {
      console.log(`✅ ${platforms[index]}: ${result.value.length} contests`);
      allContests = allContests.concat(result.value);
    } else {
      console.error(` ${platforms[index]} failed:`, result.reason);
    }
  });

  if (allContests.length === 0) {
    console.warn("No contests fetched from any platform");
    return [];
  }

  // save to MongoDB using bulkWrite with upsert
  // upsert = update if exists, insert if not
  // this way we don't get duplicates on repeated fetches
  const bulkOps = allContests.map((contest) => ({
    updateOne: {
      filter: {
        externalId: contest.externalId,
        platform  : contest.platform,
      },
      update: {
        $set: {
          ...contest,
          fetchedAt: new Date(), // reset TTL clock
        },
      },
      upsert: true,
    },
  }));

  await Contest.bulkWrite(bulkOps);
  console.log(`Saved ${allContests.length} contests to cache`);

  return allContests;
};

module.exports = aggregateContests;