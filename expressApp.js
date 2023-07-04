const { json, urlencoded } = require("express");
const cors = require("cors");
const { initRoutes } = require("./initRoutes.js");
const errorHandlingMiddleware = require("./middlewares/errorHandling");
const InvalidPathError = require("./errors/invalid-path-error.js");

const expressApp = async (app) => {
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  //-------------initialize all routes-------------//
  initRoutes(app);

  //--------------For invalid routes--------//
  //--------------Always at the end of all routes defined--------//
  app.use("*", (req, res, next) => {
    throw new InvalidPathError(`Can't find ${req.originalUrl} on the server`);
  });

  //--------------error handling-------------//
  errorHandlingMiddleware(app);
};

module.exports = { expressApp };
