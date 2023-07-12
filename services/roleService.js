const { ROLE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { ROLE_NAME } = ROLE_MODEL_KEYWORDS;
const db = require("../models");
const { Role } = db;

class RoleService {
  async addRole(roleInputs) {
    const { roleName } = roleInputs;
    const newRole = await Role.create({
      [ROLE_NAME]: roleName,
    });
    return newRole;
  }
}

module.exports = { RoleService };
