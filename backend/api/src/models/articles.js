const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

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
    views: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Articles;
