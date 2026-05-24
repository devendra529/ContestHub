// server/controllers/auth.controller.js

const User         = require("../models/User.model");
const ApiError     = require("../utils/ApiError");
const ApiResponse  = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const jwt          = require("jsonwebtoken");

// ── Helper: generate JWT token ────────────────────────────────
//
// pulled into its own function so both signup and login
// can use it without repeating the same jwt.sign() call
//
const generateToken = (userId) => {
  return jwt.sign(
    { _id: userId },              // payload — what we embed in the token
    process.env.JWT_SECRET,       // secret key from .env
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};


// ── SIGNUP ────────────────────────────────────────────────────
//
// POST /api/auth/signup
// Body: { name, email, password }
//
const signup = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  // basic check — make sure all fields came in
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  // check if this email is already registered
  // we do this before trying to create the user
  // so we can give a clear error message
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  // create the user — password gets hashed automatically
  // by the pre-save hook we wrote in User.model.js
  const user = await User.create({
    name,
    email,
    password,
  });

  // generate their token
  const token = generateToken(user._id);

  // send back the token and user info
  // notice we never send the password — not even the hash
  return res.status(201).json(
    new ApiResponse(201, {
      token,
      user: {
        _id        : user._id,
        name       : user.name,
        email      : user.email,
        preferences: user.preferences,
        createdAt  : user.createdAt,
      },
    }, "Account created successfully")
  );
});


// ── LOGIN ─────────────────────────────────────────────────────
//
// POST /api/auth/login
// Body: { email, password }
//
const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // find user by email
  // .select("+password") because we set select: false
  // on the password field in the schema — it won't
  // come back in queries unless we explicitly ask for it
  const user = await User.findOne({ email: email.toLowerCase() })
                         .select("+password");

  if (!user) {
    // intentionally vague — don't tell them which part is wrong
    // saying "email not found" helps attackers enumerate users
    throw new ApiError(401, "Invalid email or password");
  }

  // compare the plain password they sent against
  // the stored bcrypt hash using our schema method
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  return res.status(200).json(
    new ApiResponse(200, {
      token,
      user: {
        _id        : user._id,
        name       : user.name,
        email      : user.email,
        preferences: user.preferences,
        createdAt  : user.createdAt,
      },
    }, "Logged in successfully")
  );
});


// ── GET ME ────────────────────────────────────────────────────
//
// GET /api/auth/me
// Protected — requires valid JWT in Authorization header
//
// By the time this runs, auth.middleware.js has already
// verified the token and attached the user to req.user
// so we just return it
//
const getMe = asyncHandler(async (req, res) => {

  // req.user was set by auth.middleware.js
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
    }, "User fetched successfully")
  );
});


module.exports = { signup, login, getMe };