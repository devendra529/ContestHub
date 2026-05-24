// server/routes/bookmark.routes.js

const express     = require("express");
const router      = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmark,
} = require("../controllers/bookmark.controller");

// all bookmark routes are protected
router.use(verifyToken);

router.get("/",                    getBookmarks);
router.get("/check",               checkBookmark);
router.post("/",                   addBookmark);
router.delete("/:bookmarkId",      removeBookmark);

module.exports = router;