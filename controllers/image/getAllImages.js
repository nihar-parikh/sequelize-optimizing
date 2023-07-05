const { ImageService } = require("../../services/imageService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");

const imageService = new ImageService();

exports.getAllImages = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  let { page, pageSize, filter, filterFields, search } = req.body;
  page = page ? page : 1;
  pageSize = pageSize ? pageSize : 10;
  filter = filter ? filter : {};
  filterFields = filterFields ? filterFields : {};
  search = search ? search : "";

  const include = [];

  const allImages = await imageService.fetchAllImages({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  });

  return res.status(200).json({
    status: "success",
    data: allImages,
  });
});
