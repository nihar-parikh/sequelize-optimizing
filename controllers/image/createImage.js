const { IMAGE_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { TITLE, URL, USER_ID } = IMAGE_REQUEST_KEYWORDS;
const { ImageService } = require("../../services/imageService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");

const imageService = new ImageService();

exports.createImage = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);
  console.log(req.userInfo);
  const { [TITLE]: title, [URL]: url, [USER_ID]: userId } = req.body;

  // const newImage = await imageService.addImage({ title, url, userId });
  // if (newImage) {
  //   return res.status(200).json({
  //     status: "success",
  //     data: newImage,
  //   });
  // }
  return res.status(200).json({
    status: "success",
    data: "",
  });
});
