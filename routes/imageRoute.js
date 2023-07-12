const express = require("express");

const { createImage, getAllImages } = require("../controllers/image");
const {
  createImageValidations,
  getAllImagesValidations,
} = require("../validations/imageValidations");
const { hasAccess } = require("../middlewares/hasAccess");
const { isAuthenticate } = require("../middlewares/isAuthenticate");

const imageRoute = express.Router();

imageRoute.post(
  "/add",
  [...createImageValidations],
  [isAuthenticate],
  hasAccess({
    permissions: [{ permissionName: "post", action: "create" }],
  }),
  createImage
);
imageRoute.post("/all", [...getAllImagesValidations], getAllImages);

module.exports = { imageRoute };
