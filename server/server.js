// server/server.js

require("dotenv").config();

const app                  = require("./app");
const connectDB            = require("./config/db");
const { verifyEmailConnection } = require("./config/nodemailer");
const startReminderJob     = require("./jobs/reminder.job");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await verifyEmailConnection();

    const server = app.listen(PORT, () => {
      console.log(`
  ╔══════════════════════════════════════╗
  ║       ContestHub API Server          ║
  ╠══════════════════════════════════════╣
  ║  Status : Running                    ║
  ║  Port   : ${PORT}                    ║
  ║  Mode   : ${process.env.NODE_ENV}    ║
  ╚══════════════════════════════════════╝
      `);
    });

    // start the email reminder cron job
    startReminderJob();

    const shutdown = (signal) => {
      console.log(`\n${signal} received — shutting down...`);
      server.close(() => process.exit(0));
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT",  () => shutdown("SIGINT"));

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();