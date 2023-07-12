const { PERMISSION_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { PERMISSION_NAME, ACTION } = PERMISSION_MODEL_KEYWORDS;
const db = require("../models");
const { NotFoundError } = require("../errors");
const { Permission } = db;

class PermissionService {
  async addPermission(permissionInputs) {
    const { permissionName, action } = permissionInputs;

    const newPermissions = await Promise.all(
      action.map(async (actionType) => {
        const existingPermission = await Permission.findOne({
          where: { [PERMISSION_NAME]: permissionName, [ACTION]: actionType },
        });
        if (!existingPermission) {
          const createdPermission = await Permission.create({
            [PERMISSION_NAME]: permissionName,
            [ACTION]: actionType,
          });
          return createdPermission;
        }
      })
    );

    return newPermissions;
  }
}

module.exports = { PermissionService };
