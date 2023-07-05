const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { VideoService } = require("../../services/videoService");

const videoService = new VideoService();

exports.getAllVideos = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  let { page, pageSize, filter, filterFields, search } = req.body;
  page = page ? page : 1;
  pageSize = pageSize ? pageSize : 10;
  filter = filter ? filter : {};
  filterFields = filterFields ? filterFields : {};
  search = search ? search : "";

  const include = [];

  const allVideos = await videoService.fetchAllVideos({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  });

  return res.status(200).json({
    status: "success",
    data: allVideos,
  });
});
