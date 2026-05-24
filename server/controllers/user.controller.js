// server/controllers/user.controller.js

const User         = require("../models/User.model");
const Bookmark     = require("../models/Bookmark.model");
const Note         = require("../models/Note.model");
const ApiError     = require("../utils/ApiError");
const ApiResponse  = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// ── GET PROFILE ───────────────────────────────────────────────
//
// GET /api/user/profile
//
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      user: {
        _id                : user._id,
        name               : user.name,
        email              : user.email,
        preferences        : user.preferences,
        emailNotifications : user.emailNotifications,
        createdAt          : user.createdAt,
      },
    }, "Profile fetched successfully")
  );
});

// ── GET STATS ─────────────────────────────────────────────────
//
// GET /api/user/stats
//
const getStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // run all three count queries in parallel
  const [
    totalBookmarks,
    totalNotes,
    bookmarksByPlatform,
  ] = await Promise.all([
    Bookmark.countDocuments({ userId }),
    Note.countDocuments({ userId }),

    // group bookmarks by platform to show analytics
    Bookmark.aggregate([
      { $match: { userId } },
      { $group: { _id: "$platform", count: { $sum: 1 } } },
      { $sort:  { count: -1 } },
    ]),
  ]);

  // find which platform they bookmark most
  const favoritePlatform = bookmarksByPlatform.length > 0
    ? bookmarksByPlatform[0]._id
    : null;

  return res.status(200).json(
    new ApiResponse(200, {
      totalBookmarks,
      totalNotes,
      bookmarksByPlatform,
      favoritePlatform,
    }, "Stats fetched successfully")
  );
});

// ── UPDATE PREFERENCES ────────────────────────────────────────
//
// PUT /api/user/preferences
// Body: { platforms, darkMode, emailNotifications }
//
const updatePreferences = asyncHandler(async (req, res) => {
  const { platforms, darkMode, emailNotifications } = req.body;

  const updateData = {};

  if (platforms !== undefined) {
    updateData["preferences.platforms"] = platforms;
  }

  if (darkMode !== undefined) {
    updateData["preferences.darkMode"] = darkMode;
  }

  if (emailNotifications !== undefined) {
    updateData.emailNotifications = emailNotifications;
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return res.status(200).json(
    new ApiResponse(200, {
      preferences        : user.preferences,
      emailNotifications : user.emailNotifications,
    }, "Preferences updated successfully")
  );
});

module.exports = { getProfile, getStats, updatePreferences };