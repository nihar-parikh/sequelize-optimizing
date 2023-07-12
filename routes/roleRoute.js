const express = require("express");
const { createRole, assignPermissionsToRole } = require("../controllers/role");

const roleRoute = express.Router();

roleRoute.post("/create", [], createRole);
roleRoute.post("/assign-permissions", [], assignPermissionsToRole);

module.exports = { roleRoute };
