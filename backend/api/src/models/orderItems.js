const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfOrderItems } = require("../config/statusSettings");
const Catalogs = require("./catalogs");
const Orders = require("./orders");

const OrderItems = sequelize.define(
  "orderItems",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    catalogId: {
      field: "catalogId",
      type: DataTypes.INTEGER,
      references: {
        model: "catalogs",
        key: "id",
      },
    },
    orderId: {
      field: "orderId",
      type: DataTypes.INTEGER,
      references: {
        model: "orders",
        key: "id",
      },
    },
    capacity: {
      field: "capacity",
      type: DataTypes.INTEGER,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfOrderItems),
    },
  },
  {
    timestamps: true,
  },
);

OrderItems.belongsTo(Catalogs, {
  foreignKey: "catalogId",
});

OrderItems.belongsTo(Orders, {
  foreignKey: "orderId",
});

Orders.hasMany(OrderItems, {
  foreignKey: "orderId",
});

module.exports = OrderItems;
