const { json, urlencoded } = require("express");
const cors = require("cors");
const { initRoutes } = require("./initRoutes.js");

const expressApp = async (app) => {
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  //-------------initialize all routes-------------//
  initRoutes(app);

  //--------------error handling--------//
  //   app.use(ErrorHandler);
};

module.exports = { expressApp };
