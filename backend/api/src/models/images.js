const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define(
  "images",
  {
    id: {
      field: "id",
      type: DataTypes.STRING,
      primaryKey: true,
    },
    url: {
      field: "url",
      type: DataTypes.STRING,
    },
    catalogId: {
      field: "catalogId",
      type: DataTypes.INTEGER,
      references: {
        model: "catalogs",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);
