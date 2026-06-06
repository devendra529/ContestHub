const Contest = require("../models/Contest.model");
const fetchCodeforcesContests = require("./codeforces.service");
const fetchLeetcodeContests = require("./leetcode.service");
const fetchCodechefContests = require("./codechef.service");

const aggregateContests = async () => {
  console.log("Starting contest aggregation...");

  const results = await Promise.allSettled([
    fetchCodeforcesContests(),
    fetchLeetcodeContests(),
    fetchCodechefContests(),
  ]);

  const names = [
    "Codeforces",
    "LeetCode",
    "CodeChef",
  ];

  let allContests = [];

  results.forEach((result, i) => {
    if (
      result.status === "fulfilled" &&
      result.value.length > 0
    ) {
      console.log(
        `${names[i]}: ${result.value.length} contests`
      );

      allContests = allContests.concat(
        result.value
      );
    } else {
      console.error(
        `${names[i]} failed or empty`
      );
    }
  });

  allContests = allContests.filter(
    (contest) =>
      new Date(contest.endTime) > new Date()
  );

  console.log(
    `Upcoming contests: ${allContests.length}`
  );

  await Contest.deleteMany({});

  await Contest.insertMany(
    allContests,
    { ordered: false }
  );

  console.log(
    `Saved ${allContests.length} contests`
  );

  return allContests;
};

module.exports = aggregateContests;