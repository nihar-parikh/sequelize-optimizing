const { AuthenticationError } = require("../errors");
const { asyncWrapper } = require("../utils/asyncWrapper");

const hasAccess = ({ requiredPermissionName, requiredAction }) => {
  return asyncWrapper(async (req, res, next) => {
    const { role } = req.userInfo;
    if (
      !checkHasRequiredPermission(
        role.permissions,
        requiredPermissionName,
        requiredAction
      )
    ) {
      throw new AuthenticationError(
        "You are not permitted to perform this action"
      );
    }
    next();
  });
};

const checkHasRequiredPermission = (
  userPermissions,
  requiredPermissionName,
  requiredAction
) => {
  const permissionKey = `${requiredPermissionName}_${requiredAction}`;
  return userPermissions.some((permission) => {
    const userPermissionKey = `${permission.permissionName}_${permission.action}`;
    return userPermissionKey === permissionKey;
  });
};

module.exports = { hasAccess };
