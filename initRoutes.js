const { userRoute, imageRoute, videoRoute } = require("./routes");

const initRoutes = (app) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/image", imageRoute);
  app.use("/api/v1/video", videoRoute);
};

module.exports = { initRoutes };
