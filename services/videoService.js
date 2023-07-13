const { IMAGE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, URL, USER_ID } = IMAGE_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Video, User, Comment, Tag, Role, Permission } = db;

class VideoService {
  async addVideo(videoInputs) {
    const { title, url, userId } = videoInputs;
    const newVideo = await Video.create({
      [TITLE]: title,
      [URL]: url,
      [USER_ID]: userId,
    });
    return newVideo;
  }

  async fetchAllVideos({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  }) {
    include = getVideoIncludeOptions();
    return getPaginatedResult({
      Model: Video,
      filter,
      filterFields,
      include,
      search,
      page,
      pageSize,
    });
  }
}

const getVideoIncludeOptions = () => {
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

module.exports = { VideoService };
