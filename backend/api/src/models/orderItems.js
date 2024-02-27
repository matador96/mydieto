const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfOrderItems } = require("../config/statusSettings");
const Articles = require("./articles");
const Orders = require("./orders");

const ArticleService = require("../services/articles");
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
    articleId: {
      field: "articleId",
      type: DataTypes.INTEGER,
      references: {
        model: "articles",
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
    capacity: {
      field: "capacity",
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
        const sellerId = parentRecord?.sellerId;

        if (!sellerId) {
          return;
        }

        const articleId = orderItem.articleId;

        const storageItem = await StorageService.getByFields({
          sellerId,
          articleId,
        });

        try {
          storageItem.quantity -= orderItem.quantity;
          await StorageService.update(
            storageItem,
            { id: storageItem.id },
            { transaction: options.transaction },
          );
        } catch (e) {
          const article = await ArticleService.getById(orderItem.articleId, {
            transaction: options.transaction,
          });
          const message = `На складе не хватает ${Math.abs(
            storageItem.quantity,
          )} товаров ${article.name}`;
          throw new ApplicationError(message, {
            path: "services",
          });
        }
      },
    },
    timestamps: true,
  },
);

OrderItems.belongsTo(Articles, {
  foreignKey: "articleId",
});

OrderItems.belongsTo(Orders, {
  foreignKey: "orderId",
});

Orders.hasMany(OrderItems, {
  foreignKey: "orderId",
});

module.exports = OrderItems;
