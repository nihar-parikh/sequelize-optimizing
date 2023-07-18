//uncaughtException must be at the first
// it is for synchronous process
process.on("uncaughtException", (error) => {
  console.log({ errorName: error.name, errorMessage: error.message });
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { expressApp } = require("./expressApp.js");
const db = require("./models/index.js");

const app = express();
const port = 8000;

const startServer = async () => {
  try {
    //following middleware should be before expressApp
    app.use(bodyParser.json());
    app.use(cookieParser(process.env.JWT_TOKEN_SECRET)); //pass jwt secret key for signed cookies

    await expressApp(app);

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    process.on("unhandledRejection", (error) => {
      console.log({ errorName: error.name, errorMessage: error.message });
      console.log("Unhandled rejection occurred! Shutting down...");
      process.exit(1);
    });

    process.on("SIGINT", () => {
      console.log("SIGINT signal received. Shutting down...");
      process.exit(0);
    });
  }
};

startServer();

process.on("unhandledRejection", (error) => {
  console.log({ errorName: error.name, errorMessage: error.message });
  console.log("Unhandled rejection occurred! Shutting down...");
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received. Shutting down...");
  process.exit(0);
});
