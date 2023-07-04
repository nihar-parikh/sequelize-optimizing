const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper.js");

const userService = new UserService();

exports.getAllUsers = asyncWrapper(async (req, res, next) => {
  let { page, pageSize, filter, filterFields, search } = req.body;
  page = page ? page : 1;
  pageSize = pageSize ? pageSize : 10;
  filter = filter ? filter : {};
  filterFields = filterFields ? filterFields : {};
  search = search ? search : "";

  const include = [];

  const allUsers = await userService.fetchAllUsers({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  });

  return res.status(200).json({
    status: "success",
    data: allUsers,
  });
});
