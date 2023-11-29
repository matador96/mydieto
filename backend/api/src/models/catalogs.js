const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const Images = require("./images");

const { statusesOfCatalogs } = require("../config/statusSettings");

const Catalogs = sequelize.define(
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
    // img: {
    //   field: "img",
    //   type: DataTypes.STRING,
    // },
    parentId: {
      field: "parentId",
      type: DataTypes.INTEGER,
    },
    unit: {
      field: "unit",
      type: DataTypes.STRING,
    },
    priority: {
      field: "priority",
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

Catalogs.hasOne(Images, { foreignKey: "catalogId" });

module.exports = Catalogs;
