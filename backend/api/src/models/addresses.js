const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const Addresses = sequelize.define(
  "addresses",
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
    sellerId: {
      field: "sellerId",
      type: DataTypes.INTEGER,
      references: {
        model: "sellers",
        key: "id",
      },
    },
    districtId: {
      field: "districtId",
      type: DataTypes.STRING,
    },
    districtName: {
      field: "districtName",
      type: DataTypes.STRING,
    },
    cityId: {
      field: "cityId",
      type: DataTypes.STRING,
    },
    cityName: {
      field: "cityName",
      type: DataTypes.STRING,
    },
    geoLat: {
      field: "geoLat",
      type: DataTypes.STRING,
    },
    geoLon: {
      field: "geoLon",
      type: DataTypes.STRING,
    },
    address: {
      field: "address",
      type: DataTypes.STRING,
    },
    comment: {
      field: "comment",
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Addresses;
