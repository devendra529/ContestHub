const Contest = require("./models/Contest.model");

const data = await Contest.find({ platform: "leetcode" });
console.log(data.length);