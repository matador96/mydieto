const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const { statusesOfFAQs } = require("../config/statusSettings");

module.exports = sequelize.define(
  "faqs",
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
    description: {
      field: "description",
      type: Sequelize.STRING,
    },
    service: {
      field: "service",
      type: Sequelize.STRING,
    },
    priority: {
      field: "priority",
      type: Sequelize.INTEGER,
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusesOfFAQs),
    },
  },
  {
    timestamps: true,
  },
);
