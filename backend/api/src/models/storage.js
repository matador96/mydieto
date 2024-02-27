const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
// const Sellers = require("./sellers");
const Articles = require("./articles");

const Storage = sequelize.define(
  "storage",
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
    sellerId: {
      field: "sellerId",
      type: DataTypes.INTEGER,
      references: {
        model: "sellers",
        key: "id",
      },
    },
    quantity: {
      field: "quantity",
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

// Sellers.belongsTo(storage, {
//   foreignKey: "sellerId",
// });

Storage.belongsTo(Articles, {
  foreignKey: "articleId",
});

module.exports = Storage;
