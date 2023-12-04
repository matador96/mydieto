const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfOrders } = require("../config/statusSettings");
const Addresses = require("./addresses");
const Sellers = require("./sellers");

const Orders = sequelize.define(
  "orders",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sellerId: {
      field: "sellerId",
      type: DataTypes.INTEGER,
      references: {
        model: "sellers",
        key: "id",
      },
    },
    addressId: {
      field: "addressId",
      type: DataTypes.INTEGER,
      references: {
        model: "addresses",
        key: "id",
      },
    },
    price: {
      field: "price",
      type: DataTypes.INTEGER,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfOrders),
    },
  },
  {
    timestamps: true,
  },
);

Orders.belongsTo(Addresses, {
  foreignKey: "addressId",
});

Orders.belongsTo(Sellers, {
  foreignKey: "sellerId",
});

module.exports = Orders;
