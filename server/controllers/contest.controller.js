// server/controllers/contest.controller.js

const Contest          = require("../models/Contest.model");
const aggregateContests = require("../services/contest.aggregator");
const ApiError         = require("../utils/ApiError");
const ApiResponse      = require("../utils/ApiResponse");
const asyncHandler     = require("../utils/asyncHandler");

// ── GET ALL CONTESTS ──────────────────────────────────────────
//
// GET /api/contests
// Query params: platform, status, search, page, limit
//
const getContests = asyncHandler(async (req, res) => {
  const {
    platform,
    status,
    search,
    page  = 1,
    limit = 20,
  } = req.query;

  // check if we have fresh cached data
  // fresh = at least one contest fetched in last 55 minutes
  // (slightly less than the 1hr TTL to avoid edge cases)
  const freshCache = await Contest.findOne({
    fetchedAt: { $gte: new Date(Date.now() - 55 * 60 * 1000) },
  });

  // if cache is stale or empty — re-fetch from external APIs
  if (!freshCache) {
    await aggregateContests();
  }

  // build query object for filtering
  const query = {};

  // platform filter — case insensitive
  if (platform && platform !== "all") {
    query.platform = platform.toLowerCase();
  }

  // status filter
  if (status && status !== "all") {
    query.status = status;
  }

  // search filter — regex on contest name
  // "i" flag makes it case insensitive
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // pagination
  const skip       = (parseInt(page) - 1) * parseInt(limit);
  const totalCount = await Contest.countDocuments(query);

  const contests = await Contest.find(query)
    .sort({ startTime: 1 })   // upcoming first
    .skip(skip)
    .limit(parseInt(limit));

  return res.status(200).json(
    new ApiResponse(200, {
      contests,
      pagination: {
        total      : totalCount,
        page       : parseInt(page),
        limit      : parseInt(limit),
        totalPages : Math.ceil(totalCount / parseInt(limit)),
      },
    }, "Contests fetched successfully")
  );
});

// ── GET SINGLE CONTEST ────────────────────────────────────────
//
// GET /api/contests/:id
//
const getContestById = asyncHandler(async (req, res) => {
  const contest = await Contest.findById(req.params.id);

  if (!contest) {
    throw new ApiError(404, "Contest not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { contest }, "Contest fetched successfully")
  );
});

// ── FORCE REFRESH ─────────────────────────────────────────────
//
// POST /api/contests/refresh
// manually trigger a fresh fetch — useful for testing
//
const refreshContests = asyncHandler(async (req, res) => {
  const contests = await aggregateContests();

  return res.status(200).json(
    new ApiResponse(200, {
      count: contests.length,
    }, "Contests refreshed successfully")
  );
});

module.exports = { getContests, getContestById, refreshContests };