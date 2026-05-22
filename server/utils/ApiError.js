// server/utils/ApiError.js

/**
 * CONCEPT: Custom Error Class
 * 
 * In Node.js, you can extend the built-in Error class
 * to create your own error types with extra properties.
 * 
 * Instead of throwing:  throw new Error("Not found")
 * We throw:            throw new ApiError(404, "Contest not found")
 * 
 * This gives every error a statusCode so Express
 * knows what HTTP status to send back (404, 401, 500 etc.)
 */

class ApiError extends Error {
  constructor(
    statusCode,        // HTTP status code e.g. 404, 401, 500
    message = "Something went wrong",
    errors = [],       // optional array of detailed errors
    stack = ""
  ) {
    // super() calls the parent Error class constructor
    // This sets this.message automatically
    super(message);

    this.statusCode = statusCode;
    this.message    = message;
    this.success    = false;   // always false for errors
    this.errors     = errors;

    // Stack trace helps during debugging
    // Shows exactly which line threw the error
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;


/* ─── HOW TO USE ────────────────────────────────────────────
 *
 * const ApiError = require("../utils/ApiError");
 *
 * // In a controller:
 * if (!user) {
 *   throw new ApiError(404, "User not found");
 * }
 *
 * if (!token) {
 *   throw new ApiError(401, "Unauthorized - no token");
 * }
 *
 * ──────────────────────────────────────────────────────────── */