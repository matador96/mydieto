const Sequelize = require("sequelize");
const sequelize = require("../core/db");

module.exports = sequelize.define(
  "images",
  {
    id: {
      field: "id",
      type: Sequelize.STRING,
      primaryKey: true,
    },
    url: {
      field: "url",
      type: Sequelize.STRING,
    },
    leadId: {
      field: "leadId",
      type: Sequelize.INTEGER,
      references: {
        model: "leads",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);
