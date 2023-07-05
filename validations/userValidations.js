const { body } = require("express-validator");

exports.createUserValidations = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("Invalid user name")
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "i")
    .withMessage("First Name should only contain letters and spaces"),
  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Invalid user name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "i")
    .withMessage("Last Name should only contain letters and spaces"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email must be less than or equal to 255 characters"),
];

exports.getAllUsersValidations = [
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

exports.getUserByIdValidations = [
  body("userId")
    .not()
    .isEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("Invalid user id")
    .isUUID()
    .withMessage("Invalid user id: must be a valid UUID"),
];
