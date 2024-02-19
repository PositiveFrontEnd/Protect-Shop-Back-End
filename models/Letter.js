const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    question: {
      type: String,
    },
    letter: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = Letter = mongoose.model("letters", LetterSchema);
