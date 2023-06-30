const express = require("express");
const bodyParser = require("body-parser");
const { expressApp } = require("./expressApp.js");

const app = express();
const port = 8000;

const startServer = async () => {
  await expressApp(app);

  app.use(bodyParser.json());

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();
