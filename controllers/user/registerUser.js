const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, ROLE_ID } =
  USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { RoleService } = require("../../services/roleService");
const { NotFoundError, ConflictError } = require("../../errors");
const { encryptedResponse } = require("../../utils/encryptedResponse");
const { key, iv } = require("../../config/encryptionConfig");

const userService = new UserService();
const roleService = new RoleService();

exports.registerUser = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req.body);

  const {
    [FIRST_NAME]: firstName,
    [LAST_NAME]: lastName,
    [EMAIL]: email,
    [PASSWORD]: password,
    [ROLE_ID]: roleId,
  } = req.body;

  const existingUser = await userService.fetchUserByEmail({
    email,
  });

  if (existingUser) {
    throw new ConflictError("User already exists, please login");
  }

  const existingRole = await roleService.fetchRoleById(roleId);

  if (!existingRole) {
    throw new NotFoundError("Role does not exist");
  }

  const newUser = await userService.signUpUser({
    firstName,
    lastName,
    email,
    password,
    roleId: existingRole.id,
  });
  if (!newUser) {
    throw new ConflictError("Unable to register user");
  }
  return encryptedResponse({
    res,
    statusCode: 201,
    data: newUser,
    key,
    iv,
  });
});
