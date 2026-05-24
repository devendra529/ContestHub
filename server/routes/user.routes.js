// server/routes/user.routes.js

const express     = require("express");
const router      = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getProfile,
  getStats,
  updatePreferences,
} = require("../controllers/user.controller");

router.use(verifyToken);

router.get("/profile",        getProfile);
router.get("/stats",          getStats);
router.put("/preferences",    updatePreferences);

module.exports = router;