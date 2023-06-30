const { userRoute } = require("./routes/userRoute.js");

const initRoutes = (app) => {
  app.use("/api/v1/user", userRoute);
};

module.exports = { initRoutes };
