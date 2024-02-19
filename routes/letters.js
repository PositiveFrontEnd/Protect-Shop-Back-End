const express = require("express");
const router = express.Router();

//Import controllers
const {
  addLetter,
  deleteLetter,
  getLetters,
} = require("../controllers/letters");

// @route   POST /letter
// @desc    Create new letter
// @access  Private
router.post("/", addLetter);

// @route   DELETE /letter/:id
// @desc    DELETE existing letter
// @access  Private
router.delete("/:id", deleteLetter);

// @route   GET /letter
// @desc    GET existing letter
// @access  Public
router.get("/", getLetters);

module.exports = router;
