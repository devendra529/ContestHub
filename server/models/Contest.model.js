// server/models/Contest.model.js
//Models are used to define the structure of data and interact with the database.

const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    // the id that the platform itself gives the contest
    // e.g. Codeforces gives contests numeric IDs like 1928
    externalId: {
      type    : String,
      required: true,
    },

    platform: {
      type    : String,
      required: true,
      enum    : ["codeforces", "leetcode", "codechef"],
      // lowercase so we never accidentally have
      // "Codeforces" and "codeforces" as separate values
      lowercase: true,
    },

    name: {
      type    : String,
      required: true,
      trim    : true,
    },

    startTime: {
      type    : Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    // duration stored in seconds
    // makes it easy to calculate and display
    duration: {
      type   : Number,
      default: 0,
    },

    // direct link to the contest page
    url: {
      type    : String,
      required: true,
    },

    // we calculate this when saving based on startTime and endTime
    status: {
      type    : String,
      enum    : ["upcoming", "live", "past"],
      default : "upcoming",
    },

    // THIS is the key field for caching.
    // We create a TTL index on this field below.
    // MongoDB will automatically delete this document
    // 3600 seconds (1 hour) after fetchedAt was set.
    fetchedAt: {
      type   : Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// TTL Index
//
// expireAfterSeconds: 3600 means MongoDB will delete
// any document where fetchedAt is older than 1 hour.
//
// MongoDB runs a background cleanup job every 60 seconds
// that checks for expired documents and removes them.
//
// This means our contest data is always fresh — if the
// cache is empty the controller will re-fetch from the APIs.

contestSchema.index({ fetchedAt: 1 }, { expireAfterSeconds: 3600 });

//  Compound Index 
//
// We'll frequently query contests by platform AND externalId together.
// This compound index makes those queries fast.
// Without this index, MongoDB scans every document.
// With it, MongoDB jumps straight to the result.

contestSchema.index({ platform: 1, externalId: 1 });

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;