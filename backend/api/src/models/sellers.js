const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const Addresses = require("./addresses");
const EntityCategories = require("./entityCategories");
const Ratings = require("./ratings");

const { allStatues } = require("../config/statusSettings");

const Sellers = sequelize.define(
  "sellers",
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
    },
    lastName: {
      field: "lastName",
      type: Sequelize.STRING,
    },
    surName: {
      field: "surName",
      type: Sequelize.STRING,
    },
    organization: {
      field: "organization",
      type: Sequelize.STRING,
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
    },
    mobileNumber: {
      field: "mobileNumber",
      type: Sequelize.STRING,
      unique: true,
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(allStatues),
    },
  },
  {
    timestamps: true,
  },
);

Sellers.hasMany(Addresses, {
  foreignKey: "entityId",
});

Addresses.belongsTo(Sellers, {
  foreignKey: "entityId",
});

Sellers.hasMany(EntityCategories, { foreignKey: "entityId" });

Ratings.belongsTo(Sellers, {
  foreignKey: "fromEntityId",
});

module.exports = Sellers;
