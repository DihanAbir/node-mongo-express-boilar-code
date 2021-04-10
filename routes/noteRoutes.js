const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getNoteController,
  getNotesController,
  addNotesController,
  putNoteController,
  deleteNoteController,
} = require("../controllers/noteController");

// models
const Note = require("../models/notes");

// post
router.post(
  "/",
  [
    check("title", "Title is Required").notEmpty(),
    check("description", "Description is Required").notEmpty(),
  ],
  addNotesController
);

// get
router.get("/", getNotesController);

// get single items
router.get(
  "/:id",
  [[check("id", "Notes not Found").isMongoId()]],
  getNoteController
);

// update data
router.put(
  "/:id",
  [
    check("id", "Note is not Found").isMongoId(),
    check("title", "Title is Required").optional().notEmpty(),
    check("description", "Description is Required").optional().notEmpty(),
  ],
  putNoteController
);

// delete
router.delete(
  "/:id",
  [check("id", "Note is not Found").isMongoId()],
  deleteNoteController
);

module.exports = router;
