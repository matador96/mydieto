const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
// const Sellers = require("./sellers");
const Catalogs = require("./catalogs");

const Storage = sequelize.define(
  "storage",
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
    },
  },
  {
    timestamps: true,
  },
);

// Sellers.belongsTo(storage, {
//   foreignKey: "sellerId",
// });

Storage.belongsTo(Catalogs, {
  foreignKey: "catalogId",
});

module.exports = Storage;
