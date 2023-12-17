const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const Addresses = require("./addresses");
const OrderStatuses = require("./orderStatuses");
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
    statusId: {
      field: "statusId",
      type: DataTypes.INTEGER,
      references: {
        model: "orderStatuses",
        key: "id",
      },
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

Orders.belongsTo(OrderStatuses, {
  foreignKey: "statusId",
  as: "orderStatus",
});

Orders.hasMany(OrderStatuses, {
  foreignKey: "orderId",
});

module.exports = Orders;
