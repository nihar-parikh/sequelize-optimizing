const { body } = require("express-validator");

exports.createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tag name is required")
    .isString()
    .withMessage("Invalid tag name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Tag name must be between 2 and 50 characters"),
  body("taggableId")
    .notEmpty()
    .withMessage("Taggable ID is required")
    .isString()
    .withMessage("Invalid taggable id")
    .isUUID()
    .withMessage("Invalid taggale id: must be a valid UUID"),
  body("taggableType")
    .notEmpty()
    .withMessage("Taggable type is required")
    .isString()
    .withMessage("Invalid taggable type")
    .isLength({ min: 2, max: 50 })
    .withMessage("Taggable type must be between 2 and 50 characters"),
];

exports.getAllTagsValidations = [
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
