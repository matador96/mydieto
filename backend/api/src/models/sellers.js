const Sequelize = require("sequelize");
const sequelize = require("../core/db");

const { statusesOfSellers } = require("../config/statusSettings");

const Sellers = sequelize.define(
  "sellers",
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
    firstName: {
      field: "firstName",
      type: Sequelize.STRING,
    },
    lastName: {
      field: "lastName",
      type: Sequelize.STRING,
    },
    mobileNumber: {
      field: "mobileNumber",
      type: Sequelize.STRING,
      unique: true,
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusesOfSellers),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Sellers;
