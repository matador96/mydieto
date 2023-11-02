const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfCatalogs } = require("../config/statusSettings");

const Sellers = sequelize.define(
  "catalogs",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: DataTypes.STRING,
    },
    img: {
      field: "img",
      type: DataTypes.STRING,
    },
    parentId: {
      field: "parentId",
      type: DataTypes.INTEGER,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfCatalogs),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Sellers;
