const { VIDEO_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { TITLE, URL, USER_ID } = VIDEO_REQUEST_KEYWORDS;
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { VideoService } = require("../../services/videoService");

const videoService = new VideoService();

exports.createVideo = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const { [TITLE]: title, [URL]: url, [USER_ID]: userId } = req.body;

  const newVideo = await videoService.addVideo({ title, url, userId });
  if (newVideo) {
    return res.status(200).json({
      status: "success",
      data: newVideo,
    });
  }
});
