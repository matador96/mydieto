const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfSellers } = require("../config/statusSettings");
const Addresses = require("./addresses");

const Sellers = sequelize.define(
  "sellers",
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
    firstName: {
      field: "firstName",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "lastName",
      type: DataTypes.STRING,
    },
    mobile: {
      field: "mobile",
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfSellers),
    },
  },
  {
    timestamps: true,
  },
);

Sellers.hasMany(Addresses, {
  foreignKey: "sellerId",
});

module.exports = Sellers;
