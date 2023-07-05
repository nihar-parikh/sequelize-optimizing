const express = require("express");

const { createImage, getAllImages } = require("../controllers/image");
const {
  createImageValidations,
  getAllImagesValidations,
} = require("../validations/imageValidations");

const imageRoute = express.Router();

imageRoute.post("/add", [...createImageValidations], createImage);
imageRoute.post("/all", [...getAllImagesValidations], getAllImages);

module.exports = { imageRoute };
