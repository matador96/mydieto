const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const { statusesOfRatings } = require("../config/statusSettings");

const { DataTypes } = Sequelize;

const Ratings = sequelize.define(
  "ratings",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fromEntityId: {
      field: "fromEntityId",
      type: Sequelize.INTEGER,
    },
    fromEntityType: {
      field: "fromEntityType",
      type: Sequelize.STRING,
    },
    toEntityId: {
      field: "toEntityId",
      type: Sequelize.INTEGER,
    },
    toEntityType: {
      field: "toEntityType",
      type: Sequelize.STRING,
    },
    actionForEntityId: {
      field: "actionForEntityId",
      type: Sequelize.INTEGER,
    },
    actionForEntityType: {
      field: "actionForEntityType",
      type: Sequelize.STRING,
    },
    value: {
      field: "value",
      type: Sequelize.INTEGER,
    },
    valueInFloat: {
      type: new DataTypes.VIRTUAL(),
      get: function () {
        return this.get("value") / 10;
      },
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusesOfRatings),
    },
    categoryOfRating: {
      field: "categoryOfRating",
      type: Sequelize.INTEGER,
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

module.exports = Ratings;
