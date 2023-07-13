const { COMMENT_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, COMMENTABLE_ID, COMMENTABLE_TYPE } = COMMENT_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Image, Comment, Video, Tag } = db;

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

    const includeTag = {
      model: Tag,
      as: "tags",
      attributes: ["id", "name"],
      through: { attributes: [] },
    };

    const includeLookup = {
      image: {
        model: Image,
        as: "image",
        attributes: ["id", "title", "url"],
        include: [includeTag],
      },
      video: {
        model: Video,
        as: "video",
        attributes: ["id", "title", "url"],
        include: [includeTag],
      },
    };

    include = commentableType
      ? [includeLookup[commentableType]]
      : [includeLookup.image, includeLookup.video];

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
