const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfOrderItems } = require("../config/statusSettings");
const Catalogs = require("./catalogs");
const Orders = require("./orders");

const CatalogService = require("../services/catalogs");
const StorageService = require("../services/storage");

const { DatabaseError, ApplicationError } = require("../classes/Errors");

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
    quantity: {
      field: "quantity",
      type: DataTypes.INTEGER,
    },
    unitPrice: {
      field: "unitPrice",
      type: DataTypes.STRING,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfOrderItems),
    },
  },
  {
    hooks: {
      beforeCreate: async (orderItem, options) => {
        const { parentRecord } = options;
        const sellerId = parentRecord.sellerId;
        const catalogId = orderItem.catalogId;

        const storageItem = await StorageService.getByFields({
          sellerId,
          catalogId,
        });

        try {
          storageItem.quantity -= orderItem.quantity;
          await StorageService.update(
            storageItem,
            { id: storageItem.id },
            { transaction: options.transaction },
          );
        } catch (e) {
          const catalog = await CatalogService.getById(orderItem.catalogId, {
            transaction: options.transaction,
          });
          const message = `На складе не хватает ${Math.abs(
            storageItem.quantity,
          )} товаров ${catalog.name}`;
          throw new ApplicationError(message, {
            path: "services",
          });
        }
      },
    },
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
