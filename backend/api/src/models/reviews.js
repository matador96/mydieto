const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const { statusesOfReviews } = require("../config/statusSettings");

const Reviews = sequelize.define(
  "reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    instructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "instructors",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      get() {
        return this.getDataValue("rating") / 10;
      },
      set(value) {
        this.setDataValue("rating", value * 10);
      },
    },

    comment: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM(statusesOfReviews),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Reviews;
