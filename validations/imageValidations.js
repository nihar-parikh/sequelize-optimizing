const { body } = require("express-validator");

exports.createImageValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Image title is required")
    .isString()
    .withMessage("Invalid image title")
    .isLength({ min: 2, max: 50 })
    .withMessage("Image title must be between 2 and 50 characters"),
  body("url")
    .notEmpty()
    .withMessage("Image URL is required")
    .isString()
    .withMessage("Invalid Image URL"),

  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("Invalid user id")
    .isUUID()
    .withMessage("Invalid user id: must be a valid UUID"),
];

exports.getAllImagesValidations = [
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
