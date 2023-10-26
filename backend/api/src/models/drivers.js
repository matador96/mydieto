const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const EntityCategories = require("./entityCategories");
const { allStatues } = require("../config/statusSettings");
const Ratings = require("./ratings");

const Drivers = sequelize.define(
  "drivers",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      field: "firstName",
      type: Sequelize.STRING,
      defaultValue: "",
    },
    lastName: {
      field: "lastName",
      type: Sequelize.STRING,
      defaultValue: "",
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
      defaultValue: "",
    },
    carBrand: {
      field: "carBrand",
      type: Sequelize.STRING,
      defaultValue: "",
    },
    carCapacity: {
      field: "carCapacity",
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    carNumber: {
      field: "carNumber",
      type: Sequelize.STRING,
      defaultValue: "",
    },
    carSTS: {
      field: "carSTS",
      type: Sequelize.STRING,
      defaultValue: "",
    },
    mobileNumber: {
      field: "mobileNumber",
      type: Sequelize.STRING,
      defaultValue: "",
      unique: true,
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(allStatues),
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  },
);

Drivers.hasMany(EntityCategories, { foreignKey: "entityId" });

Ratings.belongsTo(Drivers, {
  foreignKey: "toEntityId",
});

module.exports = Drivers;
