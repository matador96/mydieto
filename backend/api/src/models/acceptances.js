const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const EntityCategories = require("./entityCategories");
const Addresses = require("./addresses");
const Drivers = require("./drivers");
const { statusOfAcceptances } = require("../config/statusSettings");

const Acceptances = sequelize.define(
  "acceptances",
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
    firstName: {
      field: "firstName",
      type: Sequelize.STRING,
    },
    lastName: {
      field: "lastName",
      type: Sequelize.STRING,
    },
    mobileNumber: {
      field: "mobileNumber",
      type: Sequelize.STRING,
      unique: true,
    },
    driverId: {
      field: "driverId",
      type: Sequelize.INTEGER,
      references: {
        model: "drivers",
        key: "id",
      },
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusOfAcceptances),
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

Acceptances.hasOne(Addresses, { foreignKey: "entityId" });
Acceptances.belongsTo(Drivers, {
  foreignKey: "driverId",
});

Acceptances.hasMany(EntityCategories, { foreignKey: "entityId" });

module.exports = Acceptances;
