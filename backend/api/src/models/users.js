const { DataTypes } = require("sequelize");
const sequelize = require("../core/db");

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
  },
  {
    timestamps: true,
  },
);

module.exports = Users;
