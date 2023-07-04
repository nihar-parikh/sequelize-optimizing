const { body } = require("express-validator");

exports.createUserValidations = [
  body(`firstName`)
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("Invalid user name"),
  body(`lastName`)
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Invalid user name"),
  body(`email`).isEmail().withMessage("Invalid email"),
];
