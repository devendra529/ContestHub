// WITHOUT asyncHandler — repeated in EVERY controller 😩
const getContests = async (req, res) => {
  try {
    const contests = await Contest.find();
    res.json(contests);
  } catch (error) {
    next(error); // you must remember to do this every time
  }
};

// server/utils/asyncHandler.js

/**
 * CONCEPT: Higher-Order Function (HOF)
 * 
 * A Higher-Order Function is a function that:
 *   - Takes another function as an argument, OR
 *   - Returns a function
 * 
 * asyncHandler takes your controller function (fn),
 * wraps it in a Promise, and if it throws/rejects,
 * automatically calls next(error) — which triggers
 * the global error middleware in error.middleware.js
 * 
 * This removes try-catch from every single controller.
 */

const asyncHandler = (fn) => {
  // Returns a new Express middleware function
  return (req, res, next) => {
    // Wrap fn in Promise.resolve so both sync throws
    // and async rejections are caught
    Promise
      .resolve(fn(req, res, next))
      .catch((error) => next(error));
      // next(error) → skips all normal middleware
      // → goes straight to error.middleware.js
  };
};

module.exports = asyncHandler;


/* ─── HOW TO USE ────────────────────────────────────────────
 *
 * const asyncHandler = require("../utils/asyncHandler");
 *
 * // Wrap your controller — no try-catch needed!
 * const getContests = asyncHandler(async (req, res) => {
 *   const contests = await Contest.find();
 *   res.status(200).json(new ApiResponse(200, contests));
 * });
 *
 * // If Contest.find() throws, asyncHandler catches it
 * // and sends it to error.middleware.js automatically
 *
 * ──────────────────────────────────────────────────────────── */