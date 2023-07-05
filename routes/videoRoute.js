const express = require("express");

const { createVideo, getAllVideos } = require("../controllers/video");
const {
  createVideoValidations,
  getAllVideosValidations,
} = require("../validations/videoValidations");

const videoRoute = express.Router();

videoRoute.post("/add", [...createVideoValidations], createVideo);
videoRoute.post("/all", [...getAllVideosValidations], getAllVideos);

module.exports = { videoRoute };
