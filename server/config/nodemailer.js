// server/config/nodemailer.js

const nodemailer = require("nodemailer");

// create a reusable transporter using Gmail SMTP
// you need a Gmail App Password — not your regular password
// to get one: Google Account → Security → 2FA → App Passwords
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// verify the connection config works on startup
// this runs once when the server starts
const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log(" Email service ready");
  } catch (error) {
    // don't crash the server if email fails
    // just warn — the rest of the app still works
    console.warn("  Email service unavailable:", error.message);
  }
};

module.exports = { transporter, verifyEmailConnection };