const { body } = require("express-validator");

exports.createCommentValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Comment title is required")
    .isString()
    .withMessage("Invalid comment title")
    .isLength({ min: 2, max: 50 })
    .withMessage("Comment title must be between 2 and 50 characters"),
  body("commentableId")
    .notEmpty()
    .withMessage("Commentable ID is required")
    .isString()
    .withMessage("Invalid commentable id")
    .isUUID()
    .withMessage("Invalid commentable id: must be a valid UUID"),
  body("commentableType")
    .notEmpty()
    .withMessage("Commentable type is required")
    .isString()
    .withMessage("Invalid commentable type")
    .isLength({ min: 2, max: 50 })
    .withMessage("Comment type must be between 2 and 50 characters"),
];

exports.getAllCommentsValidations = [
  body("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  body("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page size must be a positive integer"),
  body("filter").optional().isObject().withMessage("Filter must be an object"),
  body("filterFields")
    .optional()
    .isObject()
    .withMessage("Filter fields must be an object"),
  body("search").optional().isString().withMessage("Search must be a string"),
];
