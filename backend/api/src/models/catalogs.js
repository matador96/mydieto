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
        const img = this.get("img");
        if (img) {
          return `https://drive.google.com/uc?export=download&id=${img}`;
        }

        return null;
      },
    },
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

Catalogs.belongsTo(Catalogs, {
  foreignKey: "parentId",
  as: "parentCatalog",
  }
);

module.exports = Catalogs;
