// server/middleware/error.middleware.js

/*
 * CONCEPT: Express Error Middleware
 * 
 * Normal middleware has 3 params:  (req, res, next)
 * Error middleware has 4 params:   (err, req, res, next)
 * 
 * Express identifies error middleware by the 4-argument
 * signature. When next(error) is called anywhere in the
 * app, Express skips all normal middleware and jumps
 * directly to this function.
 * 
 * This must be registered LAST in app.js — after all
 * routes — so it can catch errors from any route.
 */

const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {

  //  1. Defaults 
  let statusCode = err.statusCode || 500;
  let message    = err.message    || "Internal Server Error";

  //  2. Handle specific Mongoose errors 

  // CastError: happens when MongoDB _id format is wrong
  // e.g. /api/contests/not-a-valid-id
  if (err.name === "CastError") {
    statusCode = 400;
    message    = `Invalid ${err.path}: ${err.value}`;
  }

  // ValidationError: Mongoose schema validation failed
  // e.g. required field missing, wrong type
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Extract all validation messages into one string
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Duplicate key error (MongoDB error code 11000)
  // e.g. trying to signup with an email already in DB
  if (err.code === 11000) {
    statusCode = 409; // 409 = Conflict
    const field = Object.keys(err.keyValue)[0]; // e.g. "email"
    message    = `${field} already exists`;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message    = "Invalid token. Please login again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message    = "Token expired. Please login again";
  }

  // 3. Log error in development only
  if (process.env.NODE_ENV === "development") {
    console.error("ERROR:", err);
  }

  // 4. Send standardized JSON error response 
  res.status(statusCode).json({
    success    : false,
    statusCode : statusCode,
    message    : message,
    // Only show stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;