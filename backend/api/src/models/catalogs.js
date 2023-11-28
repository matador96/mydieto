const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

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
    img: {
      field: "img",
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: new DataTypes.VIRTUAL(),
      get() {
        return "https://drive.google.com/uc?export=download&id=" + this.get("img");
      },
    },
    parentId: {
      field: "parentId",
      type: DataTypes.INTEGER,
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

module.exports = Catalogs;
