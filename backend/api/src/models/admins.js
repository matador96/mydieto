const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfAdmins } = require("../config/statusSettings");

const Admins = sequelize.define(
  "admins",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "userId",
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfAdmins),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Admins;
