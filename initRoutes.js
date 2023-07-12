const {
  userRoute,
  imageRoute,
  videoRoute,
  commentRoute,
  tagRoute,
  roleRoute,
} = require("./routes");

const initRoutes = (app) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/image", imageRoute);
  app.use("/api/v1/video", videoRoute);
  app.use("/api/v1/comment", commentRoute);
  app.use("/api/v1/tag", tagRoute);
  app.use("/api/v1/role", roleRoute);
};

module.exports = { initRoutes };
