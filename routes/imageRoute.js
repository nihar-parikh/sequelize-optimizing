const express = require("express");

const { createImage, getAllImages } = require("../controllers/image");
const {
  createImageValidations,
  getAllImagesValidations,
} = require("../validations/imageValidations");
const { hasAccess } = require("../middlewares/hasAccess");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const imageRoute = express.Router();

imageRoute.post(
  "/add",
  [...createImageValidations],
  [isAuthenticated],
  hasAccess({
    requiredPermissionName: "post",
    requiredAction: "create",
  }),
  createImage
);
imageRoute.post(
  "/all",
  [...getAllImagesValidations],
  [isAuthenticated],
  hasAccess({
    requiredPermissionName: "post",
    requiredAction: "read",
  }),
  getAllImages
);

module.exports = { imageRoute };
