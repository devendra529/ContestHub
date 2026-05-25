const express     = require("express")
const router      = express.Router()
const {
  getContests,
  getContestById,
  refreshContests,
} = require("../controllers/contest.controller")

router.get("/",      getContests)
router.get("/:id",   getContestById)

module.exports = router