const { userRoute } = require("./userRoute");
const { imageRoute } = require("./imageRoute");
const { videoRoute } = require("./videoRoute");
const { commentRoute } = require("./commentRoute");
const { tagRoute } = require("./tagRoute");
const { roleRoute } = require("./roleRoute");
const { permissionRoute } = require("./permissionRoute");
const { encryptConfigRoute } = require("./encryptConfigRoute");

module.exports = {
  userRoute,
  imageRoute,
  videoRoute,
  commentRoute,
  tagRoute,
  roleRoute,
  permissionRoute,
  encryptConfigRoute,
};
