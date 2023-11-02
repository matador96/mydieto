const Sequelize = require("sequelize");
const sequelize = require("../core/db");

const { statusesOfAdmins } = require("../config/statusSettings");
const Users = require("./users");

const Admins = sequelize.define(
  "admins",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "userId",
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusesOfAdmins),
    },
  },
  {
    timestamps: true,
  },
);

Admins.belongsTo(Users, {
  foreignKey: "userId",
});

module.exports = Admins;
