const Sequelize = require("sequelize");
const Categories = require("./categories");
const sequelize = require("../core/db");

const EntityCategories = sequelize.define(
  "entityCategories",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entityId: {
      field: "entityId",
      type: Sequelize.INTEGER,
    },
    entityName: {
      field: "entityName",
      type: Sequelize.STRING,
    },
    materialCategoryId: {
      field: "materialCategoryId",
      type: Sequelize.INTEGER,
      references: {
        model: "materialCategories",
        key: "id",
      },
    },
    price: {
      field: "price",
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  },
);

EntityCategories.belongsTo(Categories, {
  foreignKey: "materialCategoryId",
});

module.exports = EntityCategories;
