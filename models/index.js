"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, DataTypes);
db.UserToken = require("./usertoken")(sequelize, DataTypes);
db.Image = require("./image")(sequelize, DataTypes);
db.Video = require("./video")(sequelize, DataTypes);
db.Comment = require("./comment")(sequelize, DataTypes);
db.Tag = require("./tag")(sequelize, DataTypes);
db.TagTaggable = require("./tagtaggable")(sequelize, DataTypes);
db.Role = require("./role")(sequelize, DataTypes);
db.Permission = require("./permission")(sequelize, DataTypes);
db.RolePermission = require("./rolepermission")(sequelize, DataTypes);

//Establish associations after importing all models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
