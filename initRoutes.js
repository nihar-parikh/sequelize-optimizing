const {
  userRoute,
  imageRoute,
  videoRoute,
  commentRoute,
  tagRoute,
  roleRoute,
  permissionRoute,
} = require("./routes");

const initRoutes = (app) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/image", imageRoute);
  app.use("/api/v1/video", videoRoute);
  app.use("/api/v1/comment", commentRoute);
  app.use("/api/v1/tag", tagRoute);
  app.use("/api/v1/role", roleRoute);
  app.use("/api/v1/permission", permissionRoute);
};

module.exports = { initRoutes };
