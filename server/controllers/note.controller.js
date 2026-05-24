// server/controllers/note.controller.js

const Note         = require("../models/Note.model");
const ApiError     = require("../utils/ApiError");
const ApiResponse  = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// ── GET ALL NOTES ─────────────────────────────────────────────
//
// GET /api/notes
// optional query: ?contestId=xxx&platform=yyy
//
const getNotes = asyncHandler(async (req, res) => {
  const { contestId, platform } = req.query;

  const query = { userId: req.user._id };

  // if they pass contestId, filter to notes for that contest
  if (contestId) query.contestId = contestId;
  if (platform)  query.platform  = platform;

  const notes = await Note.find(query).sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { notes }, "Notes fetched successfully")
  );
});

// ── CREATE NOTE ───────────────────────────────────────────────
//
// POST /api/notes
// Body: { contestId, platform, contestName, content }
//
const createNote = asyncHandler(async (req, res) => {
  const { contestId, platform, contestName, content } = req.body;

  if (!contestId || !platform || !content) {
    throw new ApiError(400, "contestId, platform and content are required");
  }

  const note = await Note.create({
    userId      : req.user._id,
    contestId,
    platform,
    contestName : contestName || "",
    content,
  });

  return res.status(201).json(
    new ApiResponse(201, { note }, "Note created successfully")
  );
});

// ── UPDATE NOTE ───────────────────────────────────────────────
//
// PUT /api/notes/:noteId
// Body: { content }
//
const updateNote = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  // findOneAndUpdate with { new: true } returns the
  // updated document instead of the old one
  const note = await Note.findOneAndUpdate(
    {
      _id   : req.params.noteId,
      userId: req.user._id,
    },
    { content },
    { new: true, runValidators: true }
  );

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { note }, "Note updated successfully")
  );
});

// ── DELETE NOTE ───────────────────────────────────────────────
//
// DELETE /api/notes/:noteId
//
const deleteNote = asyncHandler(async (req, res) => {

  const note = await Note.findOneAndDelete({
    _id   : req.params.noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Note deleted successfully")
  );
});

module.exports = { getNotes, createNote, updateNote, deleteNote };