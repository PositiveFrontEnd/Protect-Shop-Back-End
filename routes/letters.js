const express = require("express");
const router = express.Router();

//Import controllers
const {
  addLetter,
  deleteLetter,
  getLetters,
  updateLetter,
  getLetter,
} = require("../controllers/letters");

// @route   POST /letter
// @desc    Create new letter
// @access  Private
router.post("/", addLetter);
// @route   PUT /letter/:id
// @desc    Update existing letter
// @access  Private
router.put("/:id", updateLetter);
// @route   DELETE /letter/:id
// @desc    DELETE existing letter
// @access  Private
router.delete("/:id", deleteLetter);

// @route   GET /letter
// @desc    GET existing letter
// @access  Public

router.get("/", getLetters);
// @route   GET /letter/:id
// @desc    GET letter by id

router.get("/:id", getLetter);

module.exports = router;
