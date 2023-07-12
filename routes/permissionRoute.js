const express = require("express");
const { createPermission } = require("../controllers/permission");

const permissionRoute = express.Router();

permissionRoute.post("/create", [], createPermission);

module.exports = { permissionRoute };
