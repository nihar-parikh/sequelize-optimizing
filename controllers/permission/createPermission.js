const { PERMISSION_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { PERMISSION_NAME, ACTION } = PERMISSION_REQUEST_KEYWORDS;
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { PermissionService } = require("../../services/permissionService");

const permissionService = new PermissionService();

exports.createPermission = asyncWrapper(async (req, res, next) => {
  //   requestValidationHandler(req);

  const { [PERMISSION_NAME]: permissionName, [ACTION]: action } = req.body;

  const newPermission = await permissionService.addPermission({
    permissionName,
    action,
  });
  if (newPermission) {
    return res.status(200).json({
      status: "success",
      data: newPermission,
    });
  }
});
