const Sequelize = require("sequelize");
const sequelize = require("../core/db");

const Addresses = sequelize.define(
  "addresses",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entityId: {
      field: "entityId",
      type: Sequelize.INTEGER,
    },
    entityName: {
      field: "entityName",
      type: Sequelize.STRING,
    },
    districtId: {
      field: "districtId",
      type: Sequelize.STRING,
    },
    districtName: {
      field: "districtName",
      type: Sequelize.STRING,
    },
    cityId: {
      field: "cityId",
      type: Sequelize.STRING,
    },
    cityName: {
      field: "cityName",
      type: Sequelize.STRING,
    },
    geoLat: {
      field: "geoLat",
      type: Sequelize.STRING,
    },
    geoLon: {
      field: "geoLon",
      type: Sequelize.STRING,
    },
    address: {
      field: "address",
      type: Sequelize.STRING,
    },
    comment: {
      field: "comment",
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Addresses;
