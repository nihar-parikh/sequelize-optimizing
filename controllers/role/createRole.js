const { ROLE_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { ROLE_NAME } = ROLE_REQUEST_KEYWORDS;
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { RoleService } = require("../../services/roleService");

const roleService = new RoleService();

exports.createRole = asyncWrapper(async (req, res, next) => {
  //   requestValidationHandler(req);

  const { [ROLE_NAME]: roleName } = req.body;

  const newRole = await roleService.addRole({ roleName });
  if (newRole) {
    return res.status(200).json({
      status: "success",
      data: newRole,
    });
  }
});
