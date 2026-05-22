// server/app.js

/**
 * CONCEPT: Express Middleware Pipeline
 * 
 * In Express, every request passes through a pipeline
 * of middleware functions from top to bottom.
 * 
 * Each middleware can:
 *  1. Execute any code
 *  2. Modify req and res objects
 *  3. End the request-response cycle (res.send)
 *  4. Call next() to pass to next middleware
 * 
 * ORDER MATTERS:
 *  - cors() must come before routes
 *  - express.json() must come before routes (to parse body)
 *  - Error middleware must come LAST
 * 
 * Think of it like an assembly line —
 * each station processes the request in sequence.
 */

const express    = require("express");
const cors       = require("cors");
const rateLimit  = require("express-rate-limit");

// Import route files (empty for now — we add code Day 3+)
// const authRoutes     = require("./routes/auth.routes");
// const contestRoutes  = require("./routes/contest.routes");
// const bookmarkRoutes = require("./routes/bookmark.routes");
// const noteRoutes     = require("./routes/note.routes");
// const userRoutes     = require("./routes/user.routes");

const errorMiddleware = require("./middleware/error.middleware");

// Create Express App 
const app = express();

// MIDDLEWARE PIPELINE (order matters!)

/**
 * 1. CORS (Cross-Origin Resource Sharing)
 * 
 * By default browsers block requests from a different
 * origin (different port/domain). Our React app runs on
 * port 5173 and backend on 5000 — that's a different origin.
 * 
 * cors() middleware adds headers to the response that tell
 * the browser "yes, this origin is allowed to make requests".
 */
app.use(cors({
  origin      : process.env.CLIENT_URL || "http://localhost:5173",
  credentials : true,   // allow cookies and auth headers
  methods     : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

/**
 * 2. Body Parsers
 * 
 * express.json() parses incoming requests with JSON body.
 * Without this, req.body would be undefined.
 * 
 * When frontend sends: POST /api/auth/login
 * Body: { "email": "test@test.com", "password": "123456" }
 * 
 * express.json() parses that and puts it in req.body
 * so your controller can access req.body.email
 */
app.use(express.json({ limit: "16kb" }));

// Parses URL-encoded data (HTML form submissions)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/**
 * 3. Rate Limiter
 * 
 * Prevents abuse — limits each IP to 100 requests
 * per 15 minutes. Important for public APIs.
 * 
 * If someone writes a script to spam your API,
 * they'll get a 429 "Too Many Requests" error.
 */
const limiter = rateLimit({
  windowMs : 15 * 60 * 1000,  // 15 minutes in milliseconds
  max      : 100,              // max 100 requests per window
  message  : {
    success : false,
    message : "Too many requests from this IP. Try again after 15 minutes.",
  },
  standardHeaders : true,  // Return rate limit info in headers
  legacyHeaders   : false,
});
app.use("/api", limiter);  // apply only to /api routes

//  HEALTH CHECK ROUTE 
/**
 * A simple endpoint to verify the server is running.
 * Used by deployment platforms (Render) to check health.
 * Also useful for your own testing.
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success : true,
    message : "ContestHub API is running",
    version : "1.0.0",
    time    : new Date().toISOString(),
  });
});

//  ROUTES 
// Uncomment these as we build each feature (Day 3 onwards)
// app.use("/api/auth",      authRoutes);
// app.use("/api/contests",  contestRoutes);
// app.use("/api/bookmarks", bookmarkRoutes);
// app.use("/api/notes",     noteRoutes);
// app.use("/api/user",      userRoutes);

// 404 Handler 
// If no route matched, send a clean 404
app.use((req, res) => {
  res.status(404).json({
    success : false,
    message : `Route ${req.originalUrl} not found`,
  });
});

//  GLOBAL ERROR MIDDLEWARE 
// MUST be last — catches all errors from routes above
app.use(errorMiddleware);

module.exports = app;