// server/middleware/error.middleware.js
// Client Request → Middleware → Route/Controller → Response
/*Middleware acts like security checking:

-Identity
-Permissions
-Dangerous items

before allowing access.
*/

/*Imagine airport security:

Passenger → Security Check → Boarding Gate
*/
// Global error handling middleware for Express

const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;      //this uausally happens when an invalidMongodb objectId id is provided
    message    = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;  //this happens when  a mongoose schema validation fails
    message    = Object.values(err.errors).map((val) => val.message).join(", ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message    = `${field} already exists`;
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message    = "Invalid token. Please login again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message    = "Token expired. Please login again";
  }

  if (process.env.NODE_ENV === "development") {
    console.error("ERROR:", err);
  }
//always send a json response with success:false and the error message. 
  res.status(statusCode).json({
    success    : false,
    statusCode : statusCode,
    message    : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;