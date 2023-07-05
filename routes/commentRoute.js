const express = require("express");
const { createComment, getAllComments } = require("../controllers/comment");

const commentRoute = express.Router();

commentRoute.post("/add", [], createComment);
commentRoute.post("/all", [], getAllComments);

module.exports = { commentRoute };
