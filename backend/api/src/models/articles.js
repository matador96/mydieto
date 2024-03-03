const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
const { statusesOfArticles } = require("../config/statusSettings");

const Articles = sequelize.define(
  "articles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    views: {
      type: DataTypes.INTEGER,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfArticles),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Articles;
