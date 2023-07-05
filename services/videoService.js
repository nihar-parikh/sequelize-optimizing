const { IMAGE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { TITLE, URL, USER_ID } = IMAGE_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { Video, User } = db;

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
    include = [
      {
        model: User,
        as: "user",
      },
    ];
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

module.exports = { VideoService };
