const { IMAGE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, URL, USER_ID } = IMAGE_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Image, User, Comment, Tag } = db;

class ImageService {
  async addImage(imageInputs) {
    const { title, url, userId } = imageInputs;
    const newImage = await Image.create({
      [TITLE]: title,
      [URL]: url,
      [USER_ID]: userId,
    });
    return newImage;
  }

  async fetchAllImages({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  }) {
    include = [
      {
        model: User,
        as: "user",
      },
      {
        model: Comment,
        as: "comments",
      },
      {
        model: Tag,
        as: "tags",
      },
    ];
    return getPaginatedResult({
      Model: Image,
      filter,
      filterFields,
      include,
      search,
      page,
      pageSize,
    });
  }
}

module.exports = { ImageService };
