const Sequelize = require("sequelize");
const sequelize = require("../core/db");

module.exports = sequelize.define(
  "notifications",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      field: "title",
      type: Sequelize.STRING,
    },
    type: {
      field: "type",
      type: Sequelize.STRING,
    },
    description: {
      field: "description",
      type: Sequelize.STRING,
    },
    entityId: {
      field: "entityId",
      type: Sequelize.INTEGER,
    },
    entityName: {
      field: "entityName",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  },
);
