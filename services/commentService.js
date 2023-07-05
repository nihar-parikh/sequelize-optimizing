const { COMMENT_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, COMMENTABLE_ID, COMMENTABLE_TYPE } = COMMENT_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Image, Comment, Video } = db;

class CommentService {
  async addComment(commentInputs) {
    const { title, commentableId, commentableType } = commentInputs;
    const newComment = await Comment.create({
      [TITLE]: title,
      [COMMENTABLE_ID]: commentableId,
      [COMMENTABLE_TYPE]: commentableType,
    });
    return newComment;
  }

  async fetchAllComments({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  }) {
    const commentableType = filterFields?.commentableType;

    const includeImage = { model: Image, as: "image" };
    const includeVideo = { model: Video, as: "video" };

    include =
      commentableType === "image"
        ? [includeImage]
        : commentableType === "video"
        ? [includeVideo]
        : [includeImage, includeVideo];

    return getPaginatedResult({
      Model: Comment,
      filter,
      filterFields,
      include,
      search,
      page,
      pageSize,
    });
  }
}

module.exports = { CommentService };
