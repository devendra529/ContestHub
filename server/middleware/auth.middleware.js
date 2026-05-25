// server/middleware/auth.middleware.js

const jwt      = require("jsonwebtoken");
const User     = require("../models/User.model");
const ApiError = require("../utils/ApiError");

const verifyToken = async (req, res, next) => {
  try {

    // token comes in the Authorization header like this:
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    //
    // we split on the space and take the second part
    // req.headers.authorization gives us the full string

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. No token provided");
    }

    // "Bearer eyJ..." → split(" ") → ["Bearer", "eyJ..."] → [1]
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Access denied. Token missing");
    }

    // jwt.verify does two things:
    // 1. checks the signature using our JWT_SECRET
    // 2. checks the expiry
    // if either fails it throws an error which our
    // error middleware catches and returns as a 401
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded looks like: { _id: "64abc...", iat: 1234567890, exp: 1234567890 }
    // we use the _id to fetch the actual user from DB
    // this ensures that if a user was deleted, their old
    // token no longer works
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, "User belonging to this token no longer exists");
    }

    // attach user to request so every controller
    // downstream can access it via req.user
    req.user = user;

    // pass control to the next middleware or controller
    next();

  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;