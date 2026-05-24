// server/models/Bookmark.model.js
// Models are used to define the structure of data and interact with the database.

const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    // which user saved this
    // ObjectId is a reference to the User collection
    // ref: "User" enables mongoose's populate() feature
    // which lets you do bookmark.userId and get the full user object
    userId: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "User",
      required: true,
    },

    // the platform's own id for this contest
    // stored as string because different platforms use
    // different formats — CF uses numbers, others use strings
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

    // we store these details directly on the bookmark
    // so it survives the contest cache being cleared
    contestName: {
      type    : String,
      required: true,
    },

    startTime: {
      type: Date,
    },

    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//  Compound Unique Index 
//
// A user should not be able to bookmark the same contest twice.
// This compound unique index enforces that at the database level.
//
// If you try to insert a bookmark where the userId + contestId
// + platform combination already exists, MongoDB throws a
// duplicate key error (code 11000) which our error middleware
// catches and returns as a clean "already bookmarked" message.

bookmarkSchema.index(
  { userId: 1, contestId: 1, platform: 1 },
  { unique: true }
);

// Query index 
// We'll always fetch bookmarks by userId.
// This index makes "give me all bookmarks for this user" fast.

bookmarkSchema.index({ userId: 1 });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;