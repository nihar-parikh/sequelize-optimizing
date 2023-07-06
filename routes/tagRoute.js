const express = require("express");
const { createTag, getAllTags } = require("../controllers/tag");
const {
  getAllTagsValidations,
  createTagValidations,
} = require("../validations/tagValidations");

const tagRoute = express.Router();

tagRoute.post("/add", [...createTagValidations], createTag);
tagRoute.post("/all", [...getAllTagsValidations], getAllTags);

module.exports = { tagRoute };
