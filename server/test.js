const fetchLeetcodeContests = require("./services/leetcode.service");

(async () => {
  const contests = await fetchLeetcodeContests();
  console.log(JSON.stringify(contests, null, 2));
})();