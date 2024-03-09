const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopCommentSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);
module.exports = ShopComment = mongoose.model(
  "shopComments",
  ShopCommentSchema
);
