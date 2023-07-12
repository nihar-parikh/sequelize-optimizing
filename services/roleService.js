const { ROLE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { ID, ROLE_NAME } = ROLE_MODEL_KEYWORDS;
const db = require("../models");
const { NotFoundError } = require("../errors");
const { Role, RolePermission } = db;

class RoleService {
  async addRole(roleInputs) {
    const { roleName } = roleInputs;
    const newRole = await Role.create({
      [ROLE_NAME]: roleName,
    });
    return newRole;
  }

  async fetchRoleById(roleId) {
    const existingRole = await Role.findOne({
      where: {
        [ID]: roleId,
      },
    });
    if (!existingRole) {
      throw new NotFoundError("Role does not exist");
    }
    return existingRole;
  }

  async addPermissionsToRole({ roleId, permissionId }) {
    const assignedNewPermissions = await RolePermission.create({
      roleId,
      permissionId,
    });
    return assignedNewPermissions;
  }
}

module.exports = { RoleService };
