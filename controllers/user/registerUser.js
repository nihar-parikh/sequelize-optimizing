const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, ROLE_ID } =
  USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { RoleService } = require("../../services/roleService");

const userService = new UserService();
const roleService = new RoleService();

exports.registerUser = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const {
    [FIRST_NAME]: firstName,
    [LAST_NAME]: lastName,
    [EMAIL]: email,
    [PASSWORD]: password,
    [ROLE_ID]: roleId,
  } = req.body;

  const existingRole = await roleService.fetchRoleById(roleId);

  if (existingRole) {
    const newUser = await userService.signUpUser({
      firstName,
      lastName,
      email,
      password,
      roleId: existingRole.id,
    });
    if (newUser) {
      return res.status(200).json({
        status: "success",
        data: newUser,
      });
    }
  }
});
