// server/models/Note.model.js
//Models are used to define the structure of data and interact with the database.

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "User",
      required: true,
    },

    contestId: {
      type    : String,
      required: true,
    },

    platform: {
      type    : String,
      required: true,
      enum    : ["codeforces", "leetcode", "codechef"],
      lowercase: true,
    },

    // store the contest name so we can display it
    // without having to fetch the contest separately
    contestName: {
      type   : String,
      default: "",
    },

    content: {
      type     : String,
      required : [true, "Note content cannot be empty"],
      trim     : true,
      maxlength: [2000, "Note cannot exceed 2000 characters"],
    },
  },
  {
    // timestamps adds createdAt and updatedAt automatically
    // updatedAt is especially useful here — we can show
    // "last edited 2 hours ago" in the UI
    timestamps: true,
  }
);

// fetch all notes for a user — this will be a common query
noteSchema.index({ userId: 1 });

// fetch notes for a specific contest by a specific user
noteSchema.index({ userId: 1, contestId: 1, platform: 1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;