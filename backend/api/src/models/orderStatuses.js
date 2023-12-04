const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfOrders } = require("../config/statusSettings");

const OrderStatuses = sequelize.define(
  "orderStatuses",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      field: "orderId",
      type: DataTypes.INTEGER,
      references: {
        model: "orders",
        key: "id",
      },
    },
    status: {
      field: "status",
      type: DataTypes.STRING,
      validate: {
        isIn: statusesOfOrders
      }
    },
    comment: {
      field: "comment",
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  },
);


module.exports = OrderStatuses;
