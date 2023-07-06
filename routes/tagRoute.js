const express = require("express");
const { createTag, getAllTags } = require("../controllers/tag");

const tagRoute = express.Router();

tagRoute.post("/add", [], createTag);
tagRoute.post("/all", [], getAllTags);

module.exports = { tagRoute };
