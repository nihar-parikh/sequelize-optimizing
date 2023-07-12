const {
  ROLE_PERMISSION_REQUEST_KEYWORDS,
} = require("../../shared/requestKeywords");
const { ROLE_ID, PERMISSION_ID } = ROLE_PERMISSION_REQUEST_KEYWORDS;
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { RoleService } = require("../../services/roleService");

const roleService = new RoleService();

exports.assignPermissionsToRole = asyncWrapper(async (req, res, next) => {
  //   requestValidationHandler(req);

  const { [ROLE_ID]: roleId, [PERMISSION_ID]: permissionId } = req.body;

  const assignedNewPermissions = await roleService.addPermissionsToRole({
    roleId,
    permissionId,
  });
  if (assignedNewPermissions) {
    return res.status(200).json({
      status: "success",
      data: assignedNewPermissions,
    });
  }
});
