// server/routes/auth.routes.js

const express     = require("express");
const router      = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  signup,
  login,
  getMe
} = require("../controllers/auth.controller");


// Public routes — no token needed
router.post("/signup", signup);
router.post("/login",  login);

// Protected route — verifyToken runs first
// if token is invalid it never reaches getMe
router.get("/me", verifyToken, getMe);


module.exports = router;