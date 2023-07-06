const { COMMENT_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, COMMENTABLE_ID, COMMENTABLE_TYPE } = COMMENT_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Image, Comment, Video, Tag, TagTaggable, sequelize } = db;

class TagService {
  async addTag(tagInputs) {
    const { name, taggableId, taggableType } = tagInputs;

    const tag = await sequelize.transaction(async (t) => {
      const createdTag = await Tag.create({ name }, { transaction: t });

      const tagTaggable = await TagTaggable.create(
        { tagId: createdTag.id, taggableId, taggableType },
        { transaction: t }
      );
      return { createdTag, tagTaggable };
    });
    return tag.createdTag;
  }

  async fetchAllTags({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  }) {
    include = [
      {
        model: Image,
        as: "images",
        include: [
          {
            model: Comment,
            as: "comments",
          },
        ],
      },
      {
        model: Video,
        as: "videos",
        include: [
          {
            model: Comment,
            as: "comments",
          },
        ],
      },
    ];
    return getPaginatedResult({
      Model: Tag,
      filter,
      filterFields,
      include,
      search,
      page,
      pageSize,
    });
  }
}

module.exports = { TagService };
