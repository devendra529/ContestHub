// server/controllers/bookmark.controller.js

const Bookmark     = require("../models/Bookmark.model");
const ApiError     = require("../utils/ApiError");
const ApiResponse  = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// ── GET ALL BOOKMARKS ─────────────────────────────────────────
//
// GET /api/bookmarks
//
const getBookmarks = asyncHandler(async (req, res) => {

  const bookmarks = await Bookmark.find({ userId: req.user._id })
    .sort({ createdAt: -1 }); // newest first

  return res.status(200).json(
    new ApiResponse(200, { bookmarks }, "Bookmarks fetched successfully")
  );
});

// ── ADD BOOKMARK ──────────────────────────────────────────────
//
// POST /api/bookmarks
// Body: { contestId, platform, contestName, startTime, url }
//
const addBookmark = asyncHandler(async (req, res) => {
  const { contestId, platform, contestName, startTime, url } = req.body;

  if (!contestId || !platform) {
    throw new ApiError(400, "contestId and platform are required");
  }

  // check if already bookmarked
  // the unique compound index in the schema will also
  // catch this, but checking here lets us give a
  // nicer error message
  const existing = await Bookmark.findOne({
    userId    : req.user._id,
    contestId,
    platform,
  });

  if (existing) {
    throw new ApiError(409, "Contest already bookmarked");
  }

  const bookmark = await Bookmark.create({
    userId      : req.user._id,
    contestId,
    platform,
    contestName : contestName || "Unknown Contest",
    startTime   : startTime ? new Date(startTime) : null,
    url         : url || "",
  });

  return res.status(201).json(
    new ApiResponse(201, { bookmark }, "Contest bookmarked successfully")
  );
});

// ── REMOVE BOOKMARK ───────────────────────────────────────────
//
// DELETE /api/bookmarks/:bookmarkId
//
const removeBookmark = asyncHandler(async (req, res) => {

  const bookmark = await Bookmark.findOneAndDelete({
    _id   : req.params.bookmarkId,
    userId: req.user._id,   // make sure they own this bookmark
  });

  if (!bookmark) {
    throw new ApiError(404, "Bookmark not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Bookmark removed successfully")
  );
});

// ── CHECK IF BOOKMARKED ───────────────────────────────────────
//
// GET /api/bookmarks/check?contestId=xxx&platform=yyy
// used by the frontend to show correct bookmark icon state
//
const checkBookmark = asyncHandler(async (req, res) => {
  const { contestId, platform } = req.query;

  const bookmark = await Bookmark.findOne({
    userId: req.user._id,
    contestId,
    platform,
  });

  return res.status(200).json(
    new ApiResponse(200, {
      isBookmarked: !!bookmark,
      bookmarkId  : bookmark ? bookmark._id : null,
    }, "Check successful")
  );
});

module.exports = { getBookmarks, addBookmark, removeBookmark, checkBookmark };