// server/routes/contest.routes.js

const express     = require("express");
const router      = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getContests,
  getContestById,
  refreshContests,
} = require("../controllers/contest.controller");

// contests are public — no auth needed to browse
router.get("/",          getContests);
router.get("/:id",       getContestById);

// refresh is protected — only logged-in users can trigger it
router.post("/refresh",  verifyToken, refreshContests);

module.exports = router;