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
    include = getTagIncludeOptions();
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

const getTagIncludeOptions = () => {
  return [
    {
      model: Image,
      as: "images",
      attributes: ["id", "title", "url"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "title"],
        },
      ],
      through: { attributes: [] },
    },
    {
      model: Video,
      as: "videos",
      attributes: ["id", "title", "url"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "title"],
        },
      ],
      through: { attributes: [] },
    },
  ];
};

module.exports = { TagService };
