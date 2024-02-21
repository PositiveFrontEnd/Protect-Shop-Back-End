const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
  addShopComment,
  updateShopComment,
  deleteShopComment,
  getShopComments,
} = require("../controllers/shopComment");

// @route   POST /comments
// @desc    Add new comments
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addShopComment
);

// @route   PUT /comments/:id
// @desc    Update existing comment
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateShopComment
);

// @route   DELETE /comments/:id
// @desc    Delete existing comment
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteShopComment
);

// @route   GET /comments
// @desc    GET existing comments
// @access  Public
router.get("/", getShopComments);

module.exports = router;
