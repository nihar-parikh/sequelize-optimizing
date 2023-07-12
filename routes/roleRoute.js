const express = require("express");
const { createRole } = require("../controllers/role");

const roleRoute = express.Router();

roleRoute.post("/create", [], createRole);

module.exports = { roleRoute };
