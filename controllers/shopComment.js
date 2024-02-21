const ShopComment = require("../models/ShopComment");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addShopComment = (req, res, next) => {
  const commentData = _.cloneDeep(req.body);
  commentData.customer = req.user.id;
  const newComment = new ShopComment(queryCreator(commentData));

  newComment.populate("customer").execPopulate();

  newComment
    .save()
    .then((comment) => res.json(comment))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.updateShopComment = (req, res, next) => {
  ShopComment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (!comment) {
        return res.status(400).json({
          message: `Comment with _id "${req.params.id}" is not found.`,
        });
      } else {
        const commentData = _.cloneDeep(req.body);
        const updatedComment = queryCreator(commentData);

        ShopComment.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedComment },
          { new: true }
        )
          .populate("customer")
          .then((comment) => res.json(comment))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteShopComment = (req, res, next) => {
  ShopComment.findOne({ _id: req.params.id }).then(async (comment) => {
    if (!comment) {
      return res.status(400).json({
        message: `Comment with id "${req.params.id}" is not found.`,
      });
    } else {
      const commentToDelete = await ShopComment.findOne({
        _id: req.params.id,
      });

      ShopComment.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Comment witn id "${commentToDelete._id}" is successfully deletes from DB.`,
            deletedCommentInfo: commentToDelete,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.getShopComments = (req, res, next) => {
  ShopComment.find()
    .populate("customer")
    .then((comments) => res.status(200).json(comments))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
