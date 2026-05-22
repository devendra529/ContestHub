// server/server.js

/**
 * CONCEPT: Server Entry Point
 * 
 * server.js is the ENTRY POINT — the file Node.js runs first.
 * Its only jobs are:
 *  1. Load environment variables (dotenv)
 *  2. Connect to MongoDB
 *  3. Start the HTTP server
 *  4. Handle graceful shutdown
 * 
 * We keep app.js separate (Express config) so we can
 * import app in tests without starting the HTTP server.
 * 
 * BOOT ORDER:
 * dotenv.config() → connectDB() → app.listen()
 * 
 * We connect to DB BEFORE listening for requests.
 * If DB fails, we exit immediately — no point serving
 * requests if we can't store/read data.
 */

// dotenv.config() MUST be called before anything else
// It reads .env file and populates process.env
require("dotenv").config();

const app       = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// ── Start Server ──────────────────────────────────────────────
const startServer = async () => {
  try {

    // Step 1: Connect to MongoDB first
    await connectDB();

    // Step 2: Only start listening after DB is ready
    const server = app.listen(PORT, () => {
      console.log(`
  ╔══════════════════════════════════════╗
  ║       ContestHub API Server          ║
  ╠══════════════════════════════════════╣
  ║  Status  : Running                   ║
  ║  Port    : ${PORT}                        ║
  ║  Mode    : ${process.env.NODE_ENV}         ║
  ║  URL     : http://localhost:${PORT}   ║
  ╚══════════════════════════════════════╝
      `);
    });

    // ── Graceful Shutdown ─────────────────────────────────────
    /**
     * CONCEPT: Graceful Shutdown
     * 
     * When the server process is stopped (Ctrl+C or deployment
     * restart), we want to:
     *  1. Stop accepting new requests
     *  2. Finish processing current requests
     *  3. Close the DB connection cleanly
     * 
     * SIGTERM = signal sent by process managers (Render, Docker)
     * SIGINT  = signal sent when you press Ctrl+C
     */
    const shutdown = (signal) => {
      console.log(`\n${signal} received — shutting down gracefully...`);
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT",  () => shutdown("SIGINT"));

    // ── Unhandled Errors ──────────────────────────────────────
    /**
     * Safety nets — catch any errors that slipped through
     * asyncHandler and weren't caught anywhere else.
     */
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Promise Rejection:", reason);
      // Give server time to finish pending requests then exit
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();