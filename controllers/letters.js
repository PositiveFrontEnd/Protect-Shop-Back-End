const Letter = require("../models/Letter");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addLetter = (req, res, next) => {
  Letter.findOne({ name: req.body.name }).then((letter) => {
    if (letter) {
      return res
        .status(400)
        .json({ message: `Letter with name "${letter.name}" already exists` });
    } else {
      const initialQuery = _.cloneDeep(req.body);
      const newLetter = new Letter(queryCreator(initialQuery));

      newLetter
        .save()
        .then((letter) => res.json(letter))
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.deleteLetter = (req, res, next) => {
  Letter.findOne({ _id: req.params.id }).then(async (letter) => {
    if (!letter) {
      return res
        .status(400)
        .json({ message: `Size with _id "${req.params.id}" is not found.` });
    } else {
      const letterToDelete = await Letter.findOne({ _id: req.params.id });

      Letter.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Size witn name "${letterToDelete.name}" is successfully deletes from DB `,
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

exports.getLetters = (req, res, next) => {
  Letter.find()
    .then((letter) => res.json(letter))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
