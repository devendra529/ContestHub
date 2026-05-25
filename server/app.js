// server/app.js

require("dotenv").config();

const express    = require("express");
const cors       = require("cors");
const rateLimit  = require("express-rate-limit");

const authRoutes     = require("./routes/auth.routes");
const contestRoutes  = require("./routes/contest.routes");
const bookmarkRoutes = require("./routes/bookmark.routes");
const noteRoutes     = require("./routes/note.routes");
const userRoutes     = require("./routes/user.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

//  Middleware 
app.use(cors({
  origin     : process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods    : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const limiter = rateLimit({
  windowMs       : 15 * 60 * 1000,
  max            : 100,
  standardHeaders: true,
  legacyHeaders  : false,
  message        : {
    success: false,
    message: "Too many requests. Try again after 15 minutes.",
  },
});
app.use("/api", limiter);

// Health Check 
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ContestHub API is running",
    time   : new Date().toISOString(),
  });
});

// Routes 
app.use("/api/auth",      authRoutes);
app.use("/api/contests",  contestRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/notes",     noteRoutes);
app.use("/api/user",      userRoutes);

//  404 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error Handler 
app.use(errorMiddleware);

module.exports = app;