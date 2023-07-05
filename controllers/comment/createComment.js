const { COMMENT_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { TITLE, COMMENTABLE_ID, COMMENTABLE_TYPE } = COMMENT_REQUEST_KEYWORDS;
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { CommentService } = require("../../services/commentService");

const commentService = new CommentService();

exports.createComment = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const {
    [TITLE]: title,
    [COMMENTABLE_ID]: commentableId,
    [COMMENTABLE_TYPE]: commentableType,
  } = req.body;

  const newComment = await commentService.addComment({
    title,
    commentableId,
    commentableType,
  });
  if (newComment) {
    return res.status(200).json({
      status: "success",
      data: newComment,
    });
  }
});
