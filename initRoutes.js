const { userRoute, imageRoute, videoRoute, commentRoute } = require("./routes");

const initRoutes = (app) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/image", imageRoute);
  app.use("/api/v1/video", videoRoute);
  app.use("/api/v1/comment", commentRoute);
};

module.exports = { initRoutes };
