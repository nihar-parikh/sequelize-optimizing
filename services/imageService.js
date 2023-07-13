const { IMAGE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, URL, USER_ID } = IMAGE_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Image, User, Comment, Tag, Role, Permission } = db;

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
    include = getImageIncludeOptions();
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

const getImageIncludeOptions = () => {
  return [
    {
      model: User,
      as: "user",
      attributes: ["id", "firstName", "lastName", "email"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "roleName"],
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["id", "permissionName", "action"],
              through: { attributes: [] }, // Exclude the join table attributes
            },
          ],
        },
      ],
    },
    {
      model: Comment,
      as: "comments",
      attributes: ["id", "title"],
    },
    {
      model: Tag,
      as: "tags",
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  ];
};

module.exports = { ImageService };
