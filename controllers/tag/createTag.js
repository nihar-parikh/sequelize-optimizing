const {
  TAG_REQUEST_KEYWORDS,
  TAG_TAGGABLE_REQUEST_KEYWORDS,
} = require("../../shared/requestKeywords");
const { NAME } = TAG_REQUEST_KEYWORDS;
const { TAGGABLE_ID, TAGGABLE_TYPE } = TAG_TAGGABLE_REQUEST_KEYWORDS;
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { TagService } = require("../../services/tagService");

const tagService = new TagService();

exports.createTag = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const {
    [NAME]: name,
    [TAGGABLE_ID]: taggableId,
    [TAGGABLE_TYPE]: taggableType,
  } = req.body;

  const newTag = await tagService.addTag({
    name,
    taggableId,
    taggableType,
  });
  if (newTag) {
    return res.status(200).json({
      status: "success",
      data: newTag,
    });
  }
});
