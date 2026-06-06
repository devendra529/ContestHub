const express  = require("express")
const router   = express.Router()
const Contest  = require("../models/Contest.model")
const {
  getContests,
  getContestById,
} = require("../controllers/contest.controller")

router.get("/", getContests)

// clear old data — run once then remove
router.delete("/clear", async (req, res) => {
  try {
    await Contest.deleteMany({})
    res.json({ success: true, message: "All contests cleared" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

router.get("/:id", getContestById)

module.exports = router