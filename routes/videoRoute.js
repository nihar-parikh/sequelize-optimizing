const express = require("express");

const { createVideo, getAllVideos } = require("../controllers/video");
const {
  createVideoValidations,
  getAllVideosValidations,
} = require("../validations/videoValidations");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { hasAccess } = require("../middlewares/hasAccess");

const videoRoute = express.Router();

videoRoute.post(
  "/add",
  [...createVideoValidations],
  [isAuthenticated],
  hasAccess({
    requiredPermissionName: "post",
    requiredAction: "create",
  }),
  createVideo
);
videoRoute.post(
  "/all",
  [...getAllVideosValidations],
  [isAuthenticated],
  hasAccess({
    requiredPermissionName: "post",
    requiredAction: "read",
  }),
  getAllVideos
);

module.exports = { videoRoute };
