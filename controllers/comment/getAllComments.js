const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { CommentService } = require("../../services/commentService");

const commentService = new CommentService();

exports.getAllComments = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  let { page, pageSize, filter, filterFields, search } = req.body;
  page = page ? page : 1;
  pageSize = pageSize ? pageSize : 10;
  filter = filter ? filter : {};
  filterFields = filterFields ? filterFields : {};
  search = search ? search : "";

  const include = [];

  const allComments = await commentService.fetchAllComments({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  });

  return res.status(200).json({
    status: "success",
    data: allComments,
  });
});
