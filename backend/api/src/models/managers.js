const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfManagers } = require("../config/statusSettings");

const Managers = sequelize.define(
  "managers",
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
      type: DataTypes.ENUM(statusesOfManagers),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Managers;
