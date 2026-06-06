const Contest           = require("../models/Contest.model")
const aggregateContests = require("../services/contest.aggregator")
const ApiError          = require("../utils/ApiError")
const ApiResponse       = require("../utils/ApiResponse")
const asyncHandler      = require("../utils/asyncHandler")

const getContests = asyncHandler(async (req, res) => {
  const {
    platform,
    status,
    search,
    page  = 1,
    limit = 50,
  } = req.query

  // check if we have fresh data in last 30 minutes
  const fresh = await Contest.findOne({
    fetchedAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
  })

  if (!fresh) {
    console.log("Cache stale — fetching fresh data...")
    await aggregateContests()
  }

  const query = {}

  if (platform && platform !== "all") {
    query.platform = platform.toLowerCase()
  }

  if (status && status !== "all") {
    query.status = status
  }

  if (search) {
    query.name = { $regex: search, $options: "i" }
  }

  const skip     = (parseInt(page) - 1) * parseInt(limit)
  const total    = await Contest.countDocuments(query)
  const contests = await Contest.find(query)
    .sort({ startTime: 1 })
    .skip(skip)
    .limit(parseInt(limit))

  console.log(`Returning ${contests.length} contests`)

  return res.status(200).json(
    new ApiResponse(200, {
      contests,
      pagination: {
        total,
        page      : parseInt(page),
        limit     : parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    }, "Contests fetched successfully")
  )
})

const getContestById = asyncHandler(async (req, res) => {
  const contest = await Contest.findById(req.params.id)

  if (!contest) {
    throw new ApiError(404, "Contest not found")
  }

  return res.status(200).json(
    new ApiResponse(200, { contest }, "Contest fetched")
  )
})

module.exports = { getContests, getContestById }