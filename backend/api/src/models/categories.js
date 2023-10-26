const Sequelize = require("sequelize");
const sequelize = require("../core/db");

module.exports = sequelize.define(
  "materialCategories",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: Sequelize.STRING,
    },
    parentId: {
      field: "parentId",
      type: Sequelize.INTEGER,
    },
    unit: {
      field: "unit",
      type: Sequelize.STRING,
    },
    priority: {
      field: "priority",
      type: Sequelize.INTEGER,
    },
    status: {
      field: "status",
      type: Sequelize.STRING,
    },
  },
  { timestamps: true },
);
