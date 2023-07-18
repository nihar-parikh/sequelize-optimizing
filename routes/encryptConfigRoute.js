const express = require("express");
const { key, iv } = require("../config/encryptionConfig");

const encryptConfigRoute = express.Router();

encryptConfigRoute.get("/", [], (req, res) => {
  return res.status(200).json({
    key,
    iv,
  });
});

module.exports = { encryptConfigRoute };
