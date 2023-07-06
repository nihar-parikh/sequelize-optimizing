const express = require("express");
const { createComment, getAllComments } = require("../controllers/comment");
const {
  createCommentValidations,
  getAllCommentsValidations,
} = require("../validations/commentValidations");

const commentRoute = express.Router();

commentRoute.post("/add", [...createCommentValidations], createComment);
commentRoute.post("/all", [...getAllCommentsValidations], getAllComments);

module.exports = { commentRoute };
