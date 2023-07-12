const { AuthenticationError } = require("../errors");
const { asyncWrapper } = require("../utils/asyncWrapper");

const hasAccess = ({ permissions = [] }) => {
  return asyncWrapper(async (req, res, next) => {
    if (
      permissions.length &&
      !checkHasRequiredPermissions(req.userInfo.role.permissions, permissions)
    ) {
      throw new AuthenticationError(
        "You are not permitted to perform this action"
      );
    }
    next();
  });
};

const checkHasRequiredPermissions = (userPermissions, requiredPermissions) => {
  for (const permission of requiredPermissions) {
    const permissionExists =
      userPermissions.findIndex((userPerm) => {
        return (
          userPerm.permissionName === permission.permissionName &&
          userPerm.action === permission.action
        );
      }) !== -1;
    if (!permissionExists) {
      return false;
    }
  }
  return true;
};

module.exports = { hasAccess };
