// server/config/db.js

/**
 * CONCEPT: Database Connection with Mongoose
 * 
 * Mongoose is an ODM (Object Document Mapper).
 * It wraps the native MongoDB driver and gives you:
 *  - Schema definitions
 *  - Model methods (find, save, findById etc.)
 *  - Validation
 *  - Middleware (pre/post hooks)
 * 
 * mongoose.connect() returns a Promise.
 * We call it once in server.js before starting the server.
 * Mongoose maintains a connection pool internally.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect() takes the URI from .env
    // and an options object
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      // These options prevent deprecation warnings
      useNewUrlParser    : true,
      useUnifiedTopology : true,
    });

    // connection.connection.host tells you which
    // MongoDB server you connected to
    console.log(`
    ✅ MongoDB Connected
    Host : ${connection.connection.host}
    DB   : ${connection.connection.name}
    `);

  } catch (error) {
    // If connection fails, log the error and exit
    // process.exit(1) stops Node.js with failure code
    // We exit because the app is useless without a DB
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// ── Connection event listeners ────────────────────────────────
// These fire after initial connection

// Fires when connection is lost (e.g. Atlas goes down)
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

// Fires when Mongoose reconnects automatically
mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected");
});

module.exports = connectDB;