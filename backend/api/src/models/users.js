const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
const { statusesOfUsers } = require("../config/statusSettings");
const Roles = require("../enums/roles");

const Users = sequelize.define(
  "users",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      field: "email",
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      field: "password",
      type: DataTypes.STRING,
    },
    firstName: {
      field: "firstName",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "lastName",
      type: DataTypes.STRING,
    },
    role: {
      field: "role",
      type: DataTypes.ENUM([...Object.values(Roles)]),
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfUsers),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Users;
