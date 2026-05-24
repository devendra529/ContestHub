// server/routes/note.routes.js

const express     = require("express");
const router      = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

router.use(verifyToken);

router.get("/",           getNotes);
router.post("/",          createNote);
router.put("/:noteId",    updateNote);
router.delete("/:noteId", deleteNote);

module.exports = router;